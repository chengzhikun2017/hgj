const questions = {
  state: {
    qa_title: '支持银行卡类型',
    qa_popFlag: false,
    qa_contentId: '6',
    qa_activeIndex: '6',
  },
  getters: {
    QaPopFlag: state => state.qa_popFlag,
    QaContentId: state => state.qa_contentId,
    QaActiveIndex: state => state.qa_activeIndex,
    QaTitle: state => state.qa_title
  },
  mutations: {
    set_qa_title(s, title) {
      s.qa_title = title
    },
    toggle_qa_popflag(s, val) {
      s.qa_popFlag = val
    },
    choose_qa_contentId(s, id) {
      s.qa_contentId = id
    },
    change_qa_activeIndex(s, index) {
      s.qa_activeIndex = index
    },
    get_qa_ansqwer(s, aim, title) {
      let activeIndex = aim.split('-')[0];
      s.qa_title = title
      s.qa_activeIndex = activeIndex;
      s.qa_contentId = aim;
      s.qa_popFlag = true;
    }
  },
  actions: {},
}

export default questions