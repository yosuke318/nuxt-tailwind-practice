import { ROLES } from '~/utils/costants'


interface State {
    roleId: number | null
    userName: string
}


export const useUserStore = defineStore('user', {
    state: (): State => {
        return {
            roleId: null,
            userName: '',
        }
    },
    actions: {
        /**
         * ユーザー情報をクリア
         */
        clearUser() {
            this.$reset()
        },
        /**
         * ユーザー情報をセット
         */
        setUser() {
            const isAdmin = false

            if (isAdmin) {
                this.roleId = ROLES.ADMIN.ID
                this.userName = 'てすと管理者'
            } else {
                this.roleId = ROLES.USER.ID
                this.userName = 'ユーザー'
            }
        },
    },
})