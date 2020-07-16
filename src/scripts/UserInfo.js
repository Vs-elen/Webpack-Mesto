export class UserInfo {

    constructor(nameElement, jobElement) {
        this.nameElement = nameElement;
        this.jobElement = jobElement;
        
        this.job = '';
        this.name = '';
    }

    setUserInfo = (newName, newJob) => {
        this.name = newName;
        this.job = newJob;
        
    }

    updateUserInfo = () => {
        this.nameElement.textContent = this.name;
        this.jobElement.textContent = this.job;
        

    }

    getUserInfo = () => {
        return {
            name: this.name,
            job: this.job,
            
        }
    }
}
