new Vue ({
    el: "#app",
    data() {
        return {
            taskName: "",
            tasks: [],
            show: "",
        }
    },
    methods : {
        addTask() {
            if (this.taskName.trim() == "") return;
            this.tasks.push({
                id: new Date(),
                title: this.taskName,
                done: false,
                disabled: true,
            })
            this.addToLocal()
            this.taskName = ""
        },
        taskDone(task) {
            task.done = !task.done;
            this.addToLocal()
        },
        deleteTask(index) {
            this.tasks.splice(index , 1);
            this.addToLocal()
        },
        clearAll() {
            this.tasks = [];
            localStorage.clear();
        },
        addToLocal() {
            localStorage.setItem("allTasks", JSON.stringify(this.tasks));
            localStorage.setItem("filter",JSON.stringify(this.show));
        },
        changeDisabled(el, index) {
            let inputs = document.querySelectorAll(".task-title");
            el.disabled = !el.disabled;
            setTimeout(() => inputs[index].focus() , 0)
        },
        changeName(el , index) {
            let inputs = document.querySelectorAll(".task-title");
            if (inputs[index].value.trim() == ""){
                this.tasks.splice(index ,1);
                this.addToLocal();
                return;
            }
            el.title = inputs[index].value;
            el.disabled = true;
            this.addToLocal();
        }
    },

    computed: {
        taskFilter() {
            if (this.show == "all" || this.show == "") return this.tasks;
            else if (this.show == "active") return this.tasks.filter(el => !el.done);
            else return this.tasks.filter (el => el.done);
        }
    },

    created() {
        if (!localStorage.getItem("allTasks")) return;
        let allTask = JSON.parse(localStorage.getItem("allTasks"));
        let filteredTasks = JSON.parse(localStorage.getItem("filter"));
        this.tasks = allTask;
        this.show = filteredTasks;
        document.querySelector(".app__input").focus();
    },
})
