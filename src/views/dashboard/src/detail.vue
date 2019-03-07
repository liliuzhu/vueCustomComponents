<template>
  <rc-page padding>
    <rc-card title="客户信息">
      <rc-list>
        <rc-item label="车主" >仁洪</rc-item>
        <rc-item label="售价" >4.5</rc-item>
      </rc-list>
    </rc-card>
    <rc-card title="车辆信息">
      <rc-list>
        <rc-item label="id" >{{ $route.params.id }}</rc-item>
        <rc-item label="车商姓名" >Lily</rc-item>
        <rc-item label="车商手机号">133662138888</rc-item>
        <rc-item label="车商城市">北京市</rc-item>
        <rc-item label="备注">暂无</rc-item>
        <rc-item label="车商姓名">Lily</rc-item>
        <rc-item label="车商手机号">133662138888</rc-item>
      </rc-list>
      <rc-card-footer>
        <el-button size="small">返回</el-button>
        <el-button size="small" type="primary">确认</el-button>
      </rc-card-footer>
    </rc-card>
  </rc-page>
</template>
