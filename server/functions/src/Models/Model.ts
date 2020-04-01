import db from "../db";

type Constructor<T> = new (...args: Array<any>) => T;

type ValueType<T> = T extends Constructor<any>
  ? InstanceType<T>
  : Constructor<T>;

type ArrayType<T extends Array<any>> = T[number];

type BaseSchemaType = Constructor<any>;

type BaseArraySchemaType = Array<BaseSchemaType>;
type NestedArraySchemaType = Array<Schema<any>>;
type ArraySchemaType = BaseArraySchemaType | NestedArraySchemaType;

type Schema<T extends {}> = {
  [K in keyof T]: BaseSchemaType | ArraySchemaType | Schema<T[K]>;
};

type BaseDataType<T extends BaseSchemaType> = ValueType<T>;

type BaseArrayDataType<T extends BaseArraySchemaType> = Array<
  BaseDataType<ArrayType<T>>
>;

type NestedArrayDataType<T extends NestedArraySchemaType> = Array<
  Data<ArrayType<T>>
>;

type ArrayDataType<T extends ArraySchemaType> = T extends BaseArraySchemaType
  ? BaseArrayDataType<any>
  : T extends NestedArrayDataType<any>
  ? NestedArrayDataType<T>
  : never;

type Data<T extends Schema<any>> = {
  [K in keyof T]: T[K] extends BaseSchemaType
    ? BaseDataType<T[K]>
    : T[K] extends ArraySchemaType
    ? ArrayDataType<T[K]>
    : T[K] extends Schema<any>
    ? Data<T[K]>
    : never;
};

type DataWithId<T> = T & { _id: string };

export default class Model<T extends Data<U>, U extends Schema<any>> {
  constructor(protected collectionName: string, private model: U) {}
  private getCollection(): FirebaseFirestore.CollectionReference<T> {
    return db.collection(
      this.collectionName,
    ) as FirebaseFirestore.CollectionReference<T>;
  }

  private getDataFromSnapshot(
    snapshot: FirebaseFirestore.DocumentSnapshot<T>,
  ): DataWithId<T> {
    const data = { ...snapshot.data(), _id: snapshot.id };
    return data;
  }

  public async get(): Promise<DataWithId<T>[]> {
    const snapshot = await this.getCollection().get();
    return snapshot.docs.map(snap => this.getDataFromSnapshot(snap));
  }

  public async insertOne(data: T): Promise<DataWithId<T>> {
    const docRef = await this.getCollection().add(data);
    const snapshot = await docRef.get();
    return this.getDataFromSnapshot(snapshot);
  }

  public async insertMany(data: T[]): Promise<void> {
    const batch = db.batch();

    data.forEach(d => batch.set(this.getCollection().doc(), d));
    await batch.commit();
  }
}
