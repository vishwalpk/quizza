import { MutableRefObject, useEffect, useRef } from "react";

function useEventListener<KD extends keyof DocumentEventMap>(
  eventType: KD,
  listener: (this: Document, evt: DocumentEventMap[KD]) => void,
  element: Document,
  options?: boolean | AddEventListenerOptions,
): void;
function useEventListener<KH extends keyof HTMLElementEventMap>(
  eventType: KH,
  listener: (this: HTMLElement, evt: HTMLElementEventMap[KH]) => void,
  element: HTMLElement,
  options?: boolean | AddEventListenerOptions,
): void;
function useEventListener<KW extends keyof WindowEventMap>(
  eventType: KW,
  listener: (this: Window, evt: WindowEventMap[KW]) => void,
  element?: Window,
  options?: boolean | AddEventListenerOptions,
): void;
function useEventListener(
  eventType: string,
  listener: (evt: Event) => void,
  element: Document | HTMLElement | Window,
  options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<
  KD extends keyof DocumentEventMap,
  KH extends keyof HTMLElementEventMap,
  KW extends keyof WindowEventMap
>(
  eventType: KD | KH | KW | string,
  listener: (
    this: Document | HTMLElement | Window,
    evt:
      | DocumentEventMap[KD]
      | HTMLElementEventMap[KH]
      | WindowEventMap[KW]
      | Event,
  ) => void,
  element: Document | HTMLElement | Window = window,
  options?: boolean | AddEventListenerOptions,
): void {
  const savedHandler = useRef(listener);

  useEffect(() => {
    (savedHandler as MutableRefObject<typeof listener>).current = listener;
  }, [listener]);

  useEffect(() => {
    if (!element?.addEventListener) {
      return;
    }

    element.addEventListener(eventType, listener);
    return () => {
      element.removeEventListener(eventType, listener);
    };
  }, [eventType, element, listener]);
}
export default useEventListener;
