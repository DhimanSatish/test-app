import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './dtos/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-app';
  public employees: Employee[];
  public threshold = 1;
  public sumofAllSalaries = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.reloadData();
  }

  loadData() {
    this.httpClient.get('assets/data.json').subscribe((data: any) => {
      this.employees = data;
      console.log('Array Of Employees:-  ' + this.employees);
      this.changeSalaryBasedOnThreshold(this.threshold);
    });
  }
  onThresholdChange(changedThreshold) {
    this.sumofAllSalaries = 0;
    if (changedThreshold === "" || changedThreshold === 0) {
      this.resetFields();
      changedThreshold = 1;
    }
    this.changeSalaryBasedOnThreshold(changedThreshold);
  }

  resetFields() {
    this.reloadData();
    this.threshold = 1;
  }

  reloadData() {
    this.loadData();
  }

  changeSalaryBasedOnThreshold(changedThreshold) {
    console.log(changedThreshold);
    this.employees.forEach(emp => {
      this.calculateSum(this.calculateThreshold(emp, changedThreshold));
      emp.subordinates.forEach(subord => {
        this.calculateSum(this.calculateThreshold(subord, changedThreshold));
      });
    });
  }

  calculateThreshold(emp: Employee, changedThreshold): number {
    emp.empThreshold = emp.salary * changedThreshold;
    return emp.empThreshold;
  }

  calculateSum(salary) {
    this.sumofAllSalaries = this.sumofAllSalaries + salary;
  }
}
