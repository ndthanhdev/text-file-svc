import * as TextReaderSvc from "./index";

it("read full", async () => {
  const { text } = await TextReaderSvc.read("./num.txt");
  expect(text).toEqual("0123456789");
});

it("read hafl", async () => {
  const { text } = await TextReaderSvc.read("./num.txt", { maxSize: 5 });
  expect(text).toEqual("01234");
});

it("read over", async () => {
  const { text } = await TextReaderSvc.read("./num.txt", { maxSize: 15 });
  expect(text).toEqual("0123456789");
});

it("read 0", async () => {
  const { text } = await TextReaderSvc.read("./num.txt", { maxSize: 0 });
  expect(text).toEqual("");
});

it("utf8", async () => {
  const { text } = await TextReaderSvc.read("./utf8.txt");
  expect(text).toEqual("Σὲγνωρίζωἀ");
});
