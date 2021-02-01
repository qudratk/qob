import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataCollectorService {

  attemptQuizezGroup = [];
  courses: any = [];
  students: any = [];
  teachers: any = [];
  quizzes: any;
  attemptQuizez: any = [];
  obj: any = {};
  total = 0;
  report = [];
  i = 0;
  maxLength = 3;
  quizez = 0;

  constructor() {
    this.getAllCourses();
    this.getAllUsers();
    this.getAllQuizzes();
    this.getAllAttemptedQuizez();
  }

  getAllUsers(): any {
    firebase.database().ref('users').once('value', snapshot => {
      this.students = [];
      this.teachers = [];
      snapshot.forEach((node) => {
        const user = node.val();
        if (user.isStudent) {
          this.students.push(user);
        } else {
          this.teachers.push(user);
        }
      });
    });
  }

  getAllCourses(): any {
    firebase.database().ref('courses').once('value', snapshot => {
      this.courses = [];
      snapshot.forEach((node) => {
        const course = node.val();
        this.courses.push(course);
      });
      console.log(this.courses);
    });
  }

  getAllQuizzes(): any {
    firebase.database().ref('quizzes').once('value', snapshot => {
      this.quizzes = [];
      snapshot.forEach((node) => {
        const q = node.val();
        q.key = node.val().key;
        this.quizzes.push(q);
      });
    }).then(res => {
    }).catch(err => {
      console.log(err);
    });
  }

  getAllAttemptedQuizez(): any {
    firebase.database().ref('attemptQuizzes').once('value', snapshot => {
      this.attemptQuizez = [];
      const user: any = JSON.parse(localStorage.getItem('user'));
      snapshot.forEach((node) => {
        const q = node.val();
        q.key = node.val().key;
        this.attemptQuizez.push(q);
      });
    }).then(res => {
    }).catch(err => {
      console.log(err);
    });
  }

  createReport(): any {
    this.attemptQuizezGroup = this.createGroups(this.attemptQuizez, `courseKey`);
    console.log('-----------------------------', this.attemptQuizezGroup);
    this.filterQuizzesByCourseId('-MPGaQzergkIrMZ_bxH3');
  }

  filterQuizzesByCourseId(key): any {
    this.report = [];
    const courses = this.attemptQuizezGroup.filter(q => {
      return q.courseKey === key;
    });
    console.log('course: -----=======', courses[0]);
    const attempquizez = courses[0];
    return this.groupingOfStudent(attempquizez, 'studentId');
  }

  groupingOfStudent(array, keyName): any {
    const result: any = array.reduce((r, a) => {
      r[a[`${keyName}`]] = r[a[`${keyName}`]] || [];
      r[a[`${keyName}`]].push(a);
      return r;
    }, Object.create(null));
    const resultArray = Object.keys(result).map((courseIndex) => {
      const course = result[courseIndex];
      return course;
    });
    console.log('course after group', resultArray);
    resultArray.forEach((quiz, index) => {
      console.log('single', quiz);
      const studentResult: any = this.createResultObject(quiz);
      this.report.push(studentResult);
      console.log('[[[[[[[[[[[', this.report);
    });
    this.report.forEach((data, index) => {
      if (Object.keys(data).length > this.maxLength) {
        this.maxLength = Object.keys(data).length;
      }
    });
    this.quizzes = this.maxLength - 3;
    this.report.forEach((data, index) => {
      if (Object.keys(data).length !== this.maxLength) {
        for (let j = Object.keys(data).length - 3; j < this.maxLength - 3; j++) {
          data[`quiz${j + 1}`] = 0;
        }
      }
    });
    console.log('[[[[[[[[[[[]]]]]]]]]]]]]]]', this.report);
    return this.report;
  }

  createResultObject(array): any {
    this.obj = {};
    const student = this.filterStudent(array[0].studentId);
    this.obj.name = student.fullName;
    this.obj.email = student.email;
    this.total = 0;
    this.i = 0;
    while (this.i < array.length) {
      if (this.i + 1 === array[this.i].quizNo) {
        this.total = this.total + array[this.i].achievedMarks;
        this.obj[`quiz${array[this.i].quizNo}`] = array[this.i].achievedMarks;
        // this.i++;
      } else {
        for (var j = this.i + 1; j < array[this.i].quizNo; j++) {
          this.obj[`quiz${j}`] = 0;
        }
        this.obj[`quiz${array[this.i].quizNo}`] = array[this.i].achievedMarks;
        this.total = this.total + array[this.i].achievedMarks;
        // this.i = this.i + 2;
      }
      this.i++;
    }
    for (const data of array) {
    }
    this.obj.total = this.total;
    return this.obj;
  }

  filterStudent(id): any {
    const filteredStudents = this.students.filter(s => {
      return s.uid === id;
    });
    return filteredStudents[0];
  }


  createGroups(array, keyName): any {
    const result: any = array.reduce((r, a) => {
      r[a[`${keyName}`]] = r[a[`${keyName}`]] || [];
      r[a[`${keyName}`]].push(a);
      return r;
    }, Object.create(null));
    const resultArray = Object.keys(result).map((courseIndex) => {
      const course = result[courseIndex];
      return course;
    });
    resultArray.forEach((cours, index) => {
      cours.courseKey = cours[index].courseKey;
    });
    return resultArray;
  }
}
