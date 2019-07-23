var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
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
        }
    }
})

Vue.component('my-component', {
    template: '<p class="foo bar">Hi</p>'
})