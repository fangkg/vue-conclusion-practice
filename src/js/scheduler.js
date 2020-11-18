// 实现一个带并发限制的异步调度器Scheduler最多同时运行两个任务
// 异步调度器
class Scheduler {
    constructor(maxNum) {
        // 等待执行的任务队列
        this.taskList = [];
        // 当前任务数
        this.count = 0;
        // 最大任务数
        this.maxNum = maxNum;
    }

    async add(promiseCreator) {
        // 当前任务数超出最大任务数就将其加入等待执行的任务队列
        if (this.count >= this.maxNum) {
            await new Promise(resolve => {
                this.taskList.push(resolve);
            })
        }
        this.count++;
        const result = await promiseCreator();
        this.count--;
        // 当其它任务执行完任务队列中还有任务没有执行就将其出队并执行
        if (this.taskList.length > 0) {
            this.taskList.shift()();
        }

        return result;
    }

    const timeout = time => {
        return new Promise(resolve =>{
            setTimeout(resolve, time);
        })
    }

    const scheduler = new Scheduler(2);
    const addTask = (time, value) => {
        scheduler.add(() => {
            return timeout(time).then(() => {
                console.log(value)
            })
        })
    }
}