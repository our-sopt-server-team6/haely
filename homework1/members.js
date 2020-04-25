var members =[
    {name : '김해리', nickname : 'khl6235', age : 25, printInfo:function(){
        console.log('name : '+this.name+' nickname : '+this.nickname+' age : '+this.age);
    }},
    {name : '손예지', nickname : 'yezgoget', age : 23, printInfo:function(){
        console.log('name : '+this.name+' nickname : '+this.nickname+' age : '+this.age);
    }},
    {name : '이지윤', nickname : 'ezyoon', age : 23, printInfo:function(){
        console.log('name : '+this.name+' nickname : '+this.nickname+' age : '+this.age);
    }},
    {name : '김정욱', nickname : 'jungwook', age : 25, printInfo:function(){
        console.log('name : '+this.name+' nickname : '+this.nickname+' age : '+this.age);
    }},
    {name : '임형준', nickname : 'lms', age : 28, printInfo:function(){
        console.log('name : '+this.name+' nickname : '+this.nickname+' age : '+this.age);
    }},
]

console.log('members : ', members);

members[0].printInfo();
members[1].printInfo();

members.forEach(
    members => console.log(members.name+'님은 별명이 '+members.nickname+'이고, 나이가 '+members.age+'세입니다')
);