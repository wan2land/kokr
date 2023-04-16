# koKR

<p>
  <a href="https://github.com/wan2land/kokr/actions"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/wan2land/kokr/ci.yml?branch=main&logo=github&style=flat-square" /></a>
  <a href="https://codecov.io/gh/wan2land/kokr"><img alt="Coverage" src="https://img.shields.io/codecov/c/gh/wan2land/kokr?style=flat-square" /></a>
  <img alt="Language Typescript" src="https://img.shields.io/badge/language-Typescript-007acc.svg?style=flat-square" />
  <a href="https://deno.land/x/kokr"><img alt="deno.land/x/kokr" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/wan2land/kokr/main/deno.json&query=$.version&display_name=tag&label=deno.land/x/kokr@&style=flat-square&logo=deno&labelColor=000&color=777" /></a>
</p>

koKR은 한국어(ko) 및 한국(KR) 관련 유틸리티 모음으로, 타입스크립트를 기반으로
작성되었습니다. 이 라이브러리는 NPM과 Deno에서 사용할 수 있습니다.

## 목차

현재 개발된 상세 항목들은 아래 목록에 나열되어 있습니다. 앞으로도 필요한 경우
추가적인 기능을 개발하여 라이브러리를 확장할 예정입니다.

- [@kokr/date](./date): 날짜 관련 유틸리티를 제공합니다. 공휴일, 절기, 그리고
  잡절 정보를 확인하고, 영업일 기준 날짜 계산을 지원합니다.
- [@kokr/id](./id): 주민등록번호를 분석하는 도구를 제공합니다. 생년월일과 성별
  등의 정보를 확인하고, 주민등록번호의 유효성을 검증합니다.
- [@kokr/phone](./phone): 전화번호 서식 변환 도구를 제공합니다. 전화번호를
  일관된 형식으로 변환하는 기능을 지원합니다.
- [@kokr/text](./text): 한국어 문장의 조사 처리를 도와주는 유틸리티입니다.
  은/는/이/가 등의 조사를 적절하게 처리합니다.

## 문서

코드 작성 시 jsdoc을 최대한 활용하였으며, 이를 통해 Deno 페이지에서 모든 코드에
대한 문서를 확인할 수 있습니다. 자세한 사용법과 예제는 각각의 문서를 참고하세요.

[모든 문서 보기](https://deno.land/x/kokr/mod.ts)

## 기여하기

koKR 라이브러리에 기여하고 싶으신 분들은 환영입니다! 기능 추가나 버그 수정을
위한 이슈를 제안하거나, 풀 리퀘스트를 보내주시기 바랍니다. 또한, 문서 개선이나
테스트 케이스 추가 등 다양한 방식으로도 기여가 가능합니다. 함께 발전시켜나가는
라이브러리가 되기를 희망합니다.
