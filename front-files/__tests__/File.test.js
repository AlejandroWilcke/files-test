import { getFiles } from "../src/http/Files/file.http";

const mockedFile = [
  {
      file: "test2.csv",
      lines: [
          {
              text: "WvGeuHDRbNPudbqhpkc",
              number: 28297129,
              hex: "3d74da30f5c50e01664c1c423ecd2c84"
          }
      ]
  }
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockedFile),
  })
);

test("getFiles realize un fetch", async () => {
  const data = await getFiles("test2.csv");
  expect(data).toEqual(mockedFile);
  expect(fetch).toHaveBeenCalledTimes(1);
});
