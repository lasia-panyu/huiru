// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "name": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "minLength": 2
      }
    ],
    "label": "姓名"
  },
  "mobile": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "pattern": "^\\+?[0-9-]{3,20}$"
      }
    ],
    "label": "手机号码"
  },
  "idcard_type": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "身份证",
            "value": 0
          },
          {
            "text": "护照",
            "value": 1
          },
          {
            "text": "军官证",
            "value": 2
          },
          {
            "text": "港澳身份证",
            "value": 3
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "证件类型"
  },
  "idcard": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "证件号码"
  },
  "from_abroad": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "本市户籍",
            "value": 0
          },
          {
            "text": "外省户籍",
            "value": 1
          },
          {
            "text": "港澳台",
            "value": 2
          },
          {
            "text": "外国籍",
            "value": 3
          }
        ]
      }
    ],
    "label": "户籍"
  },
  "department_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "array"
      }
    ],
    "label": "部门"
  },
  "address_home_type": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "本区",
            "value": 0
          },
          {
            "text": "外区",
            "value": 1
          }
        ]
      }
    ],
    "label": "现居住地"
  },
  "address_home": {
    "rules": [
      {
        "format": "string"
      },
      {
        "minLength": 3
      }
    ],
    "label": "现居住地详细地址"
  },
  "address_work_type": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "本区",
            "value": 0
          },
          {
            "text": "外区",
            "value": 1
          }
        ]
      }
    ],
    "label": "现工作地"
  },
  "address_work": {
    "rules": [
      {
        "format": "string"
      },
      {
        "minLength": 3
      }
    ],
    "label": "工作地详细地址"
  },
  "vaccine_status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "未接种过新冠疫苗",
            "value": 0
          },
          {
            "text": "已接种第一针新冠疫苗",
            "value": 1
          },
          {
            "text": "已接种第二针新冠疫苗",
            "value": 2
          }
        ]
      }
    ],
    "label": "接种疫苗状态"
  },
  "status": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "已预约",
            "value": 0
          },
          {
            "text": "已通知",
            "value": 1
          },
          {
            "text": "已失效",
            "value": 2
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "预约记录状态"
  },
  "comment": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "备注"
  }
}

const enumConverter = {
  "idcard_type_valuetotext": {
    "0": "身份证",
    "1": "护照",
    "2": "军官证",
    "3": "港澳身份证"
  },
  "from_abroad_valuetotext": {
    "0": "本市户籍",
    "1": "外省户籍",
    "2": "港澳台",
    "3": "外国籍"
  },
  "address_home_type_valuetotext": {
    "0": "本区",
    "1": "外区"
  },
  "address_work_type_valuetotext": {
    "0": "本区",
    "1": "外区"
  },
  "vaccine_status_valuetotext": {
    "0": "未接种过新冠疫苗",
    "1": "已接种第一针新冠疫苗",
    "2": "已接种第二针新冠疫苗"
  },
  "status_valuetotext": {
    "0": "已预约",
    "1": "已通知",
    "2": "已失效"
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
