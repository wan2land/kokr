import { build, emptyDir } from "dnt/mod.ts";

const cmd = Deno.run({ cmd: ["git", "describe", "--tags"], stdout: "piped" });
const version = new TextDecoder().decode(await cmd.output()).trim();
cmd.close();

await emptyDir("./.npm");

const services = [
  {
    name: "date",
    description: "Korean date library / 한국의 날짜와 관련한 라이브러리",
    keywords: [
      "business day",
      "anniversary",
      "holiday",
      "기념일",
      "공휴일",
      "typescript",
    ],
  },
  {
    name: "id",
    description:
      "Korean id number(jumin) library / 주민등록번호와 관련한 라이브러리",
    keywords: [
      "주민등록번호",
      "주민번호",
      "id",
      "jumin",
      "typescript",
    ],
  },
  {
    name: "phone",
    description: "Korean phone number library / 전화번호와 관련한 라이브러리",
    keywords: [
      "phone",
      "formatter",
      "typescript",
    ],
  },
  {
    name: "text",
    description: "Korean text library / 한국어 문장과 관련한 라이브러리",
    keywords: [
      "한국어",
      "한글",
      "조사",
      "은는이가",
      "korean",
      "hangul",
      "typescript",
    ],
  },
];

await Promise.all(services.map(({ name, description, keywords }) =>
  build({
    entryPoints: [`./${name}/mod.ts`],
    outDir: `./.npm/${name}`,
    shims: {
      deno: false,
      custom: [
        {
          package: {
            name: "node-fetch",
            version: "~3.1.0",
          },
          globalNames: [{
            name: "fetch",
            exportName: "default",
          }, {
            name: "RequestInit",
            typeOnly: true, // only used in type declarations
          }],
        },
        {
          package: {
            name: "@denostack/shim-webstore",
            version: "~0.1.0",
          },
          globalNames: ["localStorage"],
        },
      ],
    },
    test: false,
    package: {
      name: `@kokr/${name}`,
      version,
      description,
      keywords,
      license: "MIT",
      repository: {
        type: "git",
        url: "git+https://github.com/denostack/kokr.git",
      },
      bugs: {
        url: "https://github.com/denostack/kokr/issues",
      },
    },
  }).then(() => Deno.copyFile(`${name}/README.md`, `.npm/${name}/README.md`))
));

// post build steps
