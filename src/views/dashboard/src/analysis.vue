<template>
  <rc-page class="rc-anlysis">
    <rc-toolbar>
      <rc-search :data="SearchData" :conditionList="ConditionList" :enableConditionList="enableConditionList" @saveCondition="onSaveCondition" @search="onFilter"/>
      <template slot="button">
        <el-button icon="el-icon-setting" type="text" @click="enableConditionList = true">
          开启常用检索
        </el-button>
        <el-button type="text" icon="el-icon-download" @click="onExport">
          导出
        </el-button>
        <el-dropdown split-button type="primary" size="medium">
          新建合同
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="!($rcTableSelections.length === 1)">禁用</el-dropdown-item>
            <el-dropdown-item :disabled="!($rcTableSelections.length > 3)">批量同意</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </rc-toolbar>
    <rc-table ref="table" :page="page" :columns="COLUMNS" :attr="{'height': 450}" :on="rcTableOn" bg-header @load="callServe"/>
    <br>
  </rc-page>
</template>
<script>
  import {TableMixin} from '@rrc-materials/table'
  import {getList} from '../services/demo.service'
  import {COLUMNS, SearchData, ConditionList} from './constant'

  export default {
    mixins: [TableMixin],
    data() {
      return {
        COLUMNS: COLUMNS.call(this),
        SearchData,
        ConditionList,
        enableConditionList: false,
        page: {
          enable: true,
          sizes: [5, 10, 50, 100, 150],
          size: 10,
          layout: 'total, sizes, prev, pager, next'
        }
      }
    },
    computed: {
      tableHeight () {
        return window.innerHeight - 300
      }
    },
    methods: {
      onFilter(item) {
        console.log(item)
        this.onSearch()
      },
      onSaveCondition (value) {
        console.log(value)
      },
      async callServe (table) {
        const params = {
          size: table.size,
          page: table.currentPage
        }
        const {data, total} = await getList(params)
        this.$notify.warning({ title: '提示', message: '成功' })
        table.total = total
        table.list = data
        this.tableSelections = []
      },
      onExport() {
        const dialog = this.$rcDialog({
          title: '编辑显示字段',
          showCancelButton: false,
          render(h) {
            return (
              < div >
              hello
            dialog！
          <
            /div>
          )
          },
          onClose() {
            console.log('close')
          },
          onConfirm() {
            console.log('confirm')
            dialog.hide()
          }
        })

        dialog.$on('open', () => {
          console.log('open...')
        })
        dialog.show()
      }
    }
  }
</script>
<style lang="scss">
  @include b(anlysis) {
    @include e(table-expand) {
      label {
        width: 90px;
        color: $font-color;
      }

      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 48%;
      }
    }
  }
</style>
