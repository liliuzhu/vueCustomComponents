<template>
  <div class="rc-layout">
    <Sidebar/>
    <Body>
      <Header/>
      <Content>
        <slot/>
      </Content>
    </Body>
  </div>
</template>
<script>
  export default {
    name: 'RcLayout',
    components: {
      Header: () => import(/* webpackChunkName: "rrc-materials" */'./components/Header.vue'),
      Content: () => import(/* webpackChunkName: "rrc-materials" */'./components/Content.vue'),
      Body: () => import(/* webpackChunkName: "rrc-materials" */'./components/Body.vue'),
      Sidebar: () => import(/* webpackChunkName: "rrc-materials" */'./components/Sidebar/Sidebar.vue')
    }
  }
</script>
<style lang="scss">
  @include b(layout) {
    position: relative;
    height: 100%;
    width: 100%;

    @include pseudo(after) {
      content: "";
      display: table;
      clear: both;
    }
  }
</style>
