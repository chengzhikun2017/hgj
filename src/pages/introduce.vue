<template>
  <div class="introduce hgj-container" flex="dir:top">
    <app-nav>养成页面介绍</app-nav>
    <article>
      <ul class="newsList">
        <li class="newsItem">
          <div class="title">领航新征程！</div>
          <div class="newsContent">
            <p>中央经济工作会议20日在北京闭幕。中共中央总书记、国家主席、中央军委主席习近平在会上发表重要讲话。</p>
            <p>会议指出，5年来，我们坚持观大势、谋全局、干实事，成功驾驭了我国经济发展大局，</p>
            <img src="" alt="">
          </div>
        </li>
      </ul>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  .introduce {
    article {
      background: white;
      padding:0 0.2rem;
      .newsList {
        list-style: none;
        padding: 0.05rem 0;
        .newsItem {
          position: relative;
          padding:0.2rem 0;
          &:after {
            position: absolute;
            content: ' ';
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            border: 1px dashed #d3d3d3;
            transform: scaleY(.5);
          };
          .title {
            position: relative;
            padding-left: 0.175rem;
            padding-bottom: 0.15rem;
            font-size: 0.19rem;
            color: #383838;
            font-weight: 700;
            &:before {
              position: absolute;
              content: ' ';
              left: 0;
              top: 0.09rem;
              width: 0.08rem;
              height: 0.08rem;
              border-radius: 50%;
              background: #f84f4b;
            };
          }
          .newsContent {
            p {
              padding-bottom: 0.1rem;
              font-size: 0.13rem;
              line-height: 1.46;
              color: #a4a4a4;
            }
            img {
              margin-top: 0.05rem;
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>