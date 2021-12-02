
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "content": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "留言内容/回复内容"
  },
  "imgs": {
    "rules": [
      {
        "format": "array"
      },
      {
        "arrayType": "file"
      },
      {
        "maxLength": 6
      }
    ],
    "label": "图片列表"
  },
  "contact": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "联系人"
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
    "label": "联系电话"
  }
}

const enumConverter = {}

export { validator, enumConverter }
