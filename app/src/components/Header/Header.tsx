import "./Header.scss";

import { css, jsx } from "@emotion/core";

import Container from "./../shared/Container/Container";
import { Link } from "react-router-dom";
import Text from "./../shared/Text/Text";
import { memo } from "react";

// below comment line is required
// it tells babel how to convert properly
/** @jsx jsx */
interface HeaderProps {}
export default memo(function Header(props: HeaderProps) {
  return (
    <header
      css={css`
        padding: 2em 0;
      `}
    >
      <Container>
        <Link to="/">
          <Text size={4} weight="700" variant="primary">
            Quizza
          </Text>
        </Link>
      </Container>
    </header>
  );
});
