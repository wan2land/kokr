# ko_KR - id

## 설치방법

```bash
npm install @ko_kr/id
```

```typescript
import { validate } from '@ko_kr/id'

// 일반 주민등록번호 (외국인 등록번호 미포함)
validate('010101 - 0010101')

// 외국인 등록번호 포함
validate('010101-5010105', { enableForeigner: true })
validate('010101-6010108', { enableForeigner: true })
validate('010101-7010101', { enableForeigner: true })
validate('010101-8010103', { enableForeigner: true })
```
