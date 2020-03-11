import TestCommon from "./js/sub-module-a";
import { helloworld } from "./js/sub-module-b";

const testins = new TestCommon();

testins.test();
console.log(helloworld);
