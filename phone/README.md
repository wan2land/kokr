# koKR - phone

## 설치방법

```bash
npm install @kokr/phone
```

```typescript
import { format } from "@kokr/phone";

// 전화번호 포맷
format("0212341234"); // '02-1234-1234'
format("021231234"); // '02-123-1234'

format("02****####"); // '02-****-####'
```
