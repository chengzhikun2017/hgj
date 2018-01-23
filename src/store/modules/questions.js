const questions = {
  state: {
    title: '支持银行卡类型',
    popFlag: false,
    contentId: '6',
    activeIndex: '6',
    straight: false,
  },
  getters: {
    qa_popFlag: state => state.popFlag,
    qa_contentId: state => state.contentId,
    qa_activeIndex: state => state.activeIndex,
    qa_title: state => state.title,
    qa_straight: state => state.straight,
  },
  mutations: {
    qa_set_title(s, title) {
      s.title = title
    },
    qa_toggle_popflag(s, val) {
      s.popFlag = val
    },
    qa_choose_contentId(s, id) {
      s.contentId = id
    },
    qa_change_activeIndex(s, index) {
      s.activeIndex = index
    },
    qa_change_straight(s, flag) {
      s.straight = flag
    },
    qa_get_ansqwer(s, {
      aim,
      title
    }) {
      let activeIndex = aim.split('-')[0];
      s.title = title
      s.activeIndex = activeIndex;
      s.contentId = aim;
      s.straight = true;
      s.popFlag = true;
    }
  },
  actions: {},
}

export default questions