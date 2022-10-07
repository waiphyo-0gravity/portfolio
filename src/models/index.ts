import { Models } from "@rematch/core";
import { scrollHelper } from "./scroll_helper";

export interface RootModel extends Models<RootModel> {
  scrollHelper: typeof scrollHelper
}

export const models: RootModel = { scrollHelper }