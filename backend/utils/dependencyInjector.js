
class DependencyInjector {
    constructor() {
      this.dependencies = new Map();
    }
  
    register(name, dependency) {
      this.dependencies.set(name, dependency);
    }
  
    get(name) {
      if (!this.dependencies.has(name)) {
        throw new Error(`Dependency '${name}' not found`);
      }
      return this.dependencies.get(name);
    }
  
    inject(fn) {
      if (!fn.inject) {
        throw new Error(`Function ${fn.name} does not have an inject property`);
      }
      const dependencies = fn.inject.map(dep => this.get(dep));
      return (...args) => fn(...dependencies, ...args);
    }
  }
  
  const di = new DependencyInjector();
  
 
  import TaskService from '../services/taskService.js'; 
  di.register('taskService', TaskService);
  
  export { di };
  