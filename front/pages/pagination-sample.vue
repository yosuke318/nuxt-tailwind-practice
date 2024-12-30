<template>
  <div id="app">
    <h1>ユーザー一覧</h1>
    <ul>
      <li v-for="user in paginatedUsers" :key="user.id">
        {{ user.name }} ({{ user.email }})
      </li>
    </ul>
    <Pagination :items="users" :itemNumPerPage="5" :currentPage="currentPage" @pageChanged="onPageChange"/>

  </div>

</template>

<script>
import Pagination from '../components/patination.vue'

export default {
  name: 'App',
  components: {
    Pagination
  },
  data() {
    return {
      users: [
        { id: 1, name: '山田太郎', email: 'yamada@example.com' },
        { id: 2, name: '佐藤花子', email: 'sato@example.com' },
        { id: 3, name: '鈴木一郎', email: 'suzuki@example.com' },
        { id: 4, name: '田中みどり', email: 'tanaka@example.com' },
        { id: 5, name: '高橋健太', email: 'takahashi@example.com' },
        { id: 6, name: '伊藤さくら', email: 'ito@example.com' },
        { id: 7, name: '渡辺隆', email: 'watanabe@example.com' },
        { id: 8, name: '小林美咲', email: 'kobayashi@example.com' },
        { id: 9, name: '加藤雄大', email: 'kato@example.com' },
        { id: 10, name: '吉田優子', email: 'yoshida@example.com' },
        { id: 11, name: '山本和也', email: 'yamamoto@example.com' },
        { id: 12, name: '中村愛', email: 'nakamura@example.com' },
        { id: 13, name: '石井健太郎', email: 'ishii@example.com' },
        { id: 14, name: '前田真理', email: 'maeda@example.com' },
        { id: 15, name: '木村太一', email: 'kimura@example.com' }
      ],
      currentPage: 1
    }
  },
  computed: {
    paginatedUsers() {
      const start = (this.currentPage - 1) * 5;
      const end = start + 5;
      return this.users.slice(start, end);
    }
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
    }
  }
}

</script>