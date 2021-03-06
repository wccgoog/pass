var app = new Vue({
    el: '#app',
    data: {
        message: `
        <h1>Hello Vue!</h1>
            `
    }
});
var app2 = new Vue({
    el: '#app-2',
    data: {
        message: '页面加载于 ' + new Date().toLocaleString()
    }
});
var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});
var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: '学习 JavaScript' },
            { text: '学习 Vue' },
            { text: '整个牛项目' }
        ]
    }
});
var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
});
var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue!'
    }
});

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 0, text: '蔬菜' },
            { id: 1, text: '奶酪' },
            { id: 2, text: '随便其它什么人吃的东西' }
        ]
    }
})

var wcc = new Vue({
    el: '#wcc',
    data: {
        message: 'wcc',
        isButtonDisabled: true,
        w: 'ccc',
        s: 'class',
        firstName: 'w',
        lastName: 'cc',
        isActive: true,
        hasError: true,
        baseStyles: {
            'color': 'red'
        },
        overridingStyles: {
            'font-weight': 'bold'
        },
        classObject: {
            active: true,
            'text-danger': false
        },
        items: {
            message: 'Foo',
            answer: 'Bar'
        }
    },
    computed: {
        reversedMessage: function () {
            return this.message.split('').reverse().join('')
        },
        fullName: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    },
    methods: {
        reversedMessage: function () {
            return this.message.split('').reverse().join('')
        },
        warn: function (message, event) {
            // 现在我们可以访问原生事件对象
            if (event) event.preventDefault()
            alert(message)
        }
    }
})

Vue.component('my-component', {
    template: '<p class="foo bar">Hi</p>'
})

Vue.component('todo-item', {
    template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
    props: ['title']
})

new Vue({
    el: '#todo-list-example',
    data: {
        newTodoText: '',
        todos: [
            {
                id: 1,
                title: 'Do the dishes',
            },
            {
                id: 2,
                title: 'Take out the trash',
            },
            {
                id: 3,
                title: 'Mow the lawn'
            }
        ],
        nextTodoId: 4
    },
    methods: {
        addNewTodo: function () {
            console.log('addNewTodo')
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            })
            this.newTodoText = ''
        }
    }
})


new Vue({
    el: '#example-4',
    data: {
        picked: [],
        toggle: 1,
        age: 0
    }
})

Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

Vue.component('blog-post', {
    props: ['post'],
    template: `
        <div class="blog-post">
        <h3>{{ post.title }}</h3>
        <h3>{{ post.postFontSize.toFixed(1) }}</h3>
        <h3>{{ post.postFontSize }}</h3>
        <button @click="enlargeFont(0.1)">
            Enlarge text
        </button>
        <div v-html="post.content"></div>
        </div>
    `,
    methods: {
        enlargeFont(enlargeNum) {
            this.post.postFontSize += enlargeNum
        }
    }
})




new Vue({ el: '#components-demo' })

Vue.component('custom-input', {
    props: ['value'],
    template: `
        <input
            v-bind:value="value"
            v-on:input="$emit('input',$event.target.value)"
        >
    `
})

var alertBox = {
    template: `
        <div class="demo-alert-box">
        <strong>Error!</strong>
        <slot></slot>
        <slot></slot>
        <slot></slot>
        </div>
    `
}

new Vue({
    el: '#blog-post-demo',
    components: {
        'alert-box': alertBox
    },
    data: {
        posts: [
            { id: 1, title: '1My journey with Vue', postFontSize: 1 },
            { id: 2, title: '2Blogging with Vue', postFontSize: 1 },
            { id: 3, title: '3Why Vue is so fun', postFontSize: 1 }
        ],
        event: 'wcc',
        searchText: 'input'
    },
    methods: {
        onEnlargeText: function (e) {
            console.log(e);
        }
    }
})

Vue.component('base-checkbox', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
    },
    template: `
    <div>
        <input
        type="checkbox"
        v-bind:checked="checked"
        v-on:change="$emit('change', $event.target.checked)"
        >
        <slot></slot>
    </div>
  `
})

Vue.component('base-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    computed: {
        inputListeners: function () {
            var vm = this
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
                // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    // 这里确保组件配合 `v-model` 的工作
                    input: function (event) {
                        vm.$emit('input', event.target.value)
                    },
                    focus: function () {
                        console.log('focus')
                    }
                }
            )
        }
    },
    template: `
        <label>
        {{ label }}
        <input
            v-bind="$attrs"
            v-bind:value="value"
            v-on="inputListeners"
        >
        </label>
    `
})

Vue.component('slot-demo', {
    data: function () {
        return {
            user: {
                firstName: 'w',
                lastName: 'cc'
            }
        }
    },
    template: `
        <div class="container">
            <header>
                <slot name="header"></slot>
            </header>
            <main>
                <slot v-bind:user="user">{{user.lastName}}</slot>
            </main>
            <footer>
                <slot name="footer">123</slot>
            </footer>
        </div>    
    `
})

new Vue({
    el: '#checkbox-demo',
    data: {
        lovingVue: false
    },
    methods: {
        onFocus: function () {
            console.log('onFocus')
        }
    }
})