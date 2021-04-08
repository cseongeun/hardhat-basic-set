import { useEnvironment } from "../utils";

import { ERC20Scripts } from "./ERC20.test/ERC20.test";
import { ERC721Scripts } from "./ERC721.test/ERC721.test";

describe("", function () {
  describe("ERC20", function () {
    useEnvironment("ERC20.test");
    ERC20Scripts();
  });
});
