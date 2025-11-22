import { CONTROLLER_KEY } from "@src/constants";

function Controller(basePath: string) {
  return function (target: any) {
    Reflect.defineMetadata(CONTROLLER_KEY, basePath, target);
  };
}

export default Controller;
