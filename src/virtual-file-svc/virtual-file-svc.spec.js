import * as VirtualFileSvc from "./index";

const path = "draft";

it("read + save", async () => {
  await VirtualFileSvc.remove(path);

  await VirtualFileSvc.save({ path, content: "hello world" });

  const { content } = await VirtualFileSvc.read(path);

  expect(content).toEqual("hello world");
});

it("isExist", async () => {
  await VirtualFileSvc.save({ path, content: "hello world" });

  expect(await VirtualFileSvc.isExist(path)).toEqual(true);

  await VirtualFileSvc.remove(path);

  console.log(localStorage.getItem(path));

  expect(await VirtualFileSvc.isExist(path)).toEqual(false);
});
