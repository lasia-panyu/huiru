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
        "format": "string"
      }
    ],
    "label": "证件号码"
  },
  "address": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "minLength": 3
      }
    ],
    "label": "本地住址"
  },
  "from_abroad": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "bool"
      }
    ],
    "defaultValue": false,
    "label": "是否来自国外"
  },
  "province_code": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "city_code": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "area_code": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "来源地省市区"
  },
  "from_address": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "minLength": 3
      }
    ],
    "label": "来源地地址"
  },
  "transport": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "飞机",
            "value": 0
          },
          {
            "text": "火车",
            "value": 1
          },
          {
            "text": "长途汽车",
            "value": 2
          },
          {
            "text": "自驾",
            "value": 3
          },
          {
            "text": "轮船",
            "value": 4
          }
        ]
      }
    ],
    "label": "交通工具类型"
  },
  "transport_no": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "交通工具班次"
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
            "text": "居家隔离",
            "value": 0
          },
          {
            "text": "集中隔离",
            "value": 1
          },
          {
            "text": "解除隔离",
            "value": 2
          },
          {
            "text": "送医",
            "value": 3
          },
          {
            "text": "出院居家隔离",
            "value": 4
          },
          {
            "text": "康复",
            "value": 5
          },
          {
            "text": "死亡",
            "value": 6
          }
        ]
      }
    ],
    "label": "状态"
  },
  "comment": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "备注"
  },
  "Health_code": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "绿色",
            "value": 0
          },
          {
            "text": "黄色",
            "value": 1
          },
          {
            "text": "红色",
            "value": 2
          }
        ]
      }
    ],
    "label": "健康码颜色"
  },
  "na_test_time": {
    "rules": [
      {
        "format": "timestamp"
      },
      {
        "minimum": 1609430400000
      }
    ],
    "label": "核酸检测时间"
  },
  "na_test_result": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "阴性",
            "value": 0
          },
          {
            "text": "阳性",
            "value": 1
          }
        ]
      }
    ],
    "label": "核酸检测结果"
  },
  "temperature": {
    "rules": [
      {
        "format": "double"
      },
      {
        "minimum": 36,
        "maximum": 40
      }
    ],
    "label": "体温"
  },
  "cough": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "label": "是否咳嗽"
  }
}

const enumConverter = {
  "idcard_type_valuetotext": {
    "0": "身份证",
    "1": "护照",
    "2": "军官证",
    "3": "港澳身份证"
  },
  "transport_valuetotext": {
    "0": "飞机",
    "1": "火车",
    "2": "长途汽车",
    "3": "自驾",
    "4": "轮船"
  },
  "status_valuetotext": {
    "0": "居家隔离",
    "1": "集中隔离",
    "2": "解除隔离",
    "3": "送医",
    "4": "出院居家隔离",
    "5": "康复",
    "6": "死亡"
  },
  "Health_code_valuetotext": {
    "0": "绿色",
    "1": "黄色",
    "2": "红色"
  },
  "na_test_result_valuetotext": {
    "0": "阴性",
    "1": "阳性"
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
