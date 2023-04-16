import { build, emptyDir } from "dnt/mod.ts";

const denoInfo = JSON.parse(
  Deno.readTextFileSync(new URL("../deno.json", import.meta.url)),
);
const version = denoInfo.version;

await emptyDir("./.npm");

const services = [
  {
    name: "date",
    description:
      "Provides utilities for Korean dates. 날짜 관련 유틸리티를 제공합니다. 공휴일, 절기, 그리고 잡절 정보를 확인하고, 영업일 기준 날짜 계산을 지원합니다.",
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
      "Provides utility to analyze Korean id numbers. / 주민등록번호를 분석하는 도구를 제공합니다. 생년월일과 성별 등의 정보를 확인하고, 주민등록번호의 유효성을 검증합니다.",
    keywords: [
      "주민등록번호",
      "주민번호",
      "외국인등록번호",
      "jumin",
      "typescript",
    ],
  },
  {
    name: "phone",
    description:
      "Provides a phone number format conversion tool. / 전화번호 서식 변환 도구를 제공합니다. 전화번호를 일관된 형식으로 변환하는 기능을 지원합니다.",
    keywords: [
      "전화번호",
      "phone",
      "formatter",
      "typescript",
    ],
  },
  {
    name: "text",
    description:
      "A utility to help handle investigations in Korean sentences. / 한국어 문장의 조사 처리를 도와주는 유틸리티입니다. 은/는/이/가 등의 조사를 적절하게 처리합니다.",
    keywords: [
      "한국어",
      "한글",
      "조사",
      "은는이가",
      "dedent",
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
        url: "git+https://github.com/wan2land/kokr.git",
      },
      bugs: {
        url: "https://github.com/wan2land/kokr/issues",
      },
    },
  }).then(() => Deno.copyFile(`${name}/README.md`, `.npm/${name}/README.md`))
));

// post build steps
