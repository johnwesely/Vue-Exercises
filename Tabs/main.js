Vue.component('tabs', {
    template: `
        <div>
            <div class="tabs">
                <ul>
                    <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                        <a :href="tab.href" @click="selectTab(tab)">
                            {{ tab.name }}
                        </a>
                    </li>
                </ul>
            </div>
        
            <div class="tabs-details">
                <slot></slot>
            </div>
        </div>
    `,

    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.href == selectedTab.href);
            });
        }
    },

    created() {
        this.tabs = this.$children;
    },

    data() {
        return { tabs: [] };
    }
});

Vue.component('tab', {
    template: `
        <div v-show="isActive"><slot></slot></div>
    `,

    props: {
        name: { required: true},
        selected: { default: false}
    },

    data() {
        return { isActive: false };
    },

    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },

    mounted() {
        this.isActive = this.selected;
    }

});

var root = new Vue({
    el: '#root',
});