
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "username": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "用户名"
  },
  "nickname": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "昵称"
  },
  "gender": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "未知",
            "value": 0
          },
          {
            "text": "男",
            "value": 1
          },
          {
            "text": "女",
            "value": 2
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "性别"
  },
  "mobile": {
    "rules": [
      {
        "format": "string"
      },
      {
        "pattern": "^\\+?[0-9-]{3,20}$"
      }
    ],
    "label": "手机号码"
  },
  "email": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "身份证号"
  }
}

const enumConverter = {
  "gender_valuetotext": {
    "0": "未知",
    "1": "男",
    "2": "女"
  }
}

export { validator, enumConverter }
