import { getCity, getCcList } from '../services/demo.service'

export const COLUMNS = function () {
  return [
    {
      fixed: 'left',
      type: 'expand',
      render (h, scope) {
        return (
          <el-form label-position="left" inline class="rc-anlysis__table-expand">
            <el-form-item label="商品编号">
              <span>{ scope.row.id }</span>
            </el-form-item>
            <el-form-item label="下单日期">
              <span>{ scope.row.created_at }</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{ scope.row.name }</span>
            </el-form-item>
            <el-form-item label="城市">
              <span>{ scope.row.city }</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{ scope.row.state }</span>
            </el-form-item>
            <el-form-item label="送达地址">
              <span>{ scope.row.address }</span>
            </el-form-item>
          </el-form>
        )
      }
    },
    {
      fixed: 'left',
      type: 'selection',
      width: 55
    },
    {
      fixed: 'left',
      prop: 'id',
      label: '商品编号',
      'min-width': 80,
      // 默认的是显示 设为 false 则认为需要隐藏
      hide: true
    },
    {
      prop: 'created_at',
      label: '下单日期',
      'min-width': 145,
      hide: true
    },
    {
      prop: 'name',
      label: '姓名',
      // 设为 true 在 编辑显示列 时 就不可操作
      disabledToolbar: true,
      'min-width': 120
    },
    {
      prop: 'city',
      label: '城市',
      'min-width': 120,
      'show-overflow-tooltip': true,
    },
    {
      prop: 'state',
      label: '商品状态',
      'min-width': 110
    },
    {
      prop: 'address',
      label: '送达地址',
      'min-width': 145,
      'show-overflow-tooltip': true
    },
    {
      label: '操作',
      width: 60,
      fixed: 'right',
      align: 'center',
      render (h, scope) {
        if (scope.row.state !== '退款中') {
          return (<i></i>)
        }
        const router = {
          name: 'dashboardDetail',
          params: {
            id: scope.row.id
          }
        }
        return (
          <router-link to={router}>查看</router-link>
        )
      }
    },
    // rc table 自定义 toolbar
    {
      type: 'toolbar'
    }
  ]
}

export const SearchData = [
  {
    label: '城市',
    prop: 'city',
    type: 'select',
    conditionGroup: 'select',
    attr: {
      props: {
        label: 'name',
        value: 'id'
      }
    },
    asyncData () {
      return getCity()
    }
  },
  {
    label: '跟进客服',
    prop: 'cc',
    type: 'select',
    attr: {
      props: {
        label: 'name',
        value: 'id'
      }
    },
    asyncData () {
      return getCcList()
    }
  },
  {
    label: '工单号',
    prop: 'id',
    type: 'text',
  },
  {
    label: '车源编号',
    prop: 'carId',
    type: 'text',
  },
  {
    label: '紧急程度',
    prop: 'degreeEmergency',
    type: 'select',
    condition: ['>', '<', 'like'],
    asyncData () {
      return {
        '普通': 0,
        '紧急': 1
      }
    }
  },
  {
    label: '状态',
    prop: 'state',
    type: 'select',
    value: [],
    attr: {
      multiple: true,
      'collapse-tags': true
    },
    asyncData () {
      return {
        '待指派': 0,
        '待首次联系': 1,
        '跟进中': 2,
        '达成一致': 3,
        '待审批': 4,
        '审批通过': 5,
        '已关闭': 6
      }
    }
  },
  {
    label: '创建时间',
    prop: 'create_time',
    type: 'datePicker',
    attr: {
      type: 'date',
      placeholder: '请选择创建时间'
    }
  },
  {
    label: '责任部门',
    type: 'cascader',
    prop: 'create_cascader',
    attr: {
      'show-all-levels': false
    },
    style: {
      width: '300px'
    },
    asyncData () {
      const data = require('./cascader.data')
      return data.CascaderData || []
    }
  },
  {
    label: '问题来源',
    prop: 'qa',
    renderComponent (h, instance) {
      return (
        <el-rate
          onInput={instance.sync}
          value={instance.value}>
        </el-rate>
      )
    }
  },
  {
    label: '部门',
    prop: 'depb',
    attr: {
      placeholder: '部门',
      'suffix-icon': 'el-icon-view'
    },
    type: 'text',
  }
]

// 常用检索
export const ConditionList = [
  {
    // 检索项 name
    label: '已下架',
    // 条件组ID
    id: '1',
    // 存储的条件
    value: {
      hello: '2333'
    }
  },
  {
    // 检索项 name
    label: '已售出',
    // 条件组ID
    id: '1'
  },
  {
    // selected: true,
    // 检索项 name
    label: '审核未通过',
    // 条件组ID
    id: '222',
    // 自定义条件 item
    render (h, item) {
      return (<span>{item.label} <i class="el-icon-edit"></i></span>)
    }
  }
]
