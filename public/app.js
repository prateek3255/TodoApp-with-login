angular.module("todoApp",['ngRoute','firebase'])
.config(function($routeProvider){

$routeProvider
    .when("/",{templateUrl:"views/login.html"})
    .when("/home",{templateUrl:"views/home.html"})
    .when("/list/:listitem",{templateUrl:"views/list.html"})

})
.controller("firstCtrl",firstCtrl)
.controller("homeCtrl",homeCtrl)
.controller("loginCtrl",loginCtrl)
.factory("logged",logged)
.factory("todolist",todolist)

function logged(){
    return [true];
}

function todolist(){
    return[];
}

function loginCtrl($firebaseAuth,$location,logged){
    console.log(logged[0]);
    var login=this;
    var auth =  $firebaseAuth();
    if(logged[0]){
        auth.$onAuthStateChanged(function(user) {
            if (user) {
                $location.path("/home");
            } else {
            $location.path("/"); 
            }
        });
    }
    login.loginWithGoogle=function(){
        var promise = auth.$signInWithPopup("google")

        promise.then(function(result) {
            console.log("Signed in as:", result);
            $location.path("/home");
        })
        .catch(function(error) {
            console.error("Authentication failed:", error);
        }); 
    }   

    login.loginWithFacebook=function(){
        var promise = auth.$signInWithPopup("facebook")

        promise.then(function(result) {
            console.log("Signed in as:", result);
            $location.path("/home");

        })
        .catch(function(error) {
            console.error("Authentication failed:", error);
        });
    }

    login.loginWithTwitter=function(){
        var promise = auth.$signInWithPopup("twitter")

        promise.then(function(result) {
            console.log("Signed in as:", result);
            $location.path("/home");

        })
        .catch(function(error) {
            console.error("Authentication failed:", error);
        });
    }

    login.loginWithGithub=function(){
        var promise = auth.$signInWithPopup("github")

        promise.then(function(result) {
            console.log("Signed in as:", result);
            $location.path("/home");

        })
        .catch(function(error) {
            console.error("Authentication failed:", error);
        });
    }
    

}

function homeCtrl($firebaseArray,todolist,$firebaseAuth,$location,logged){
    var home=this;
    var auth =  $firebaseAuth();
    auth.$onAuthStateChanged(function(user) {
        if (user) {
            home.user=user;
            var listRef = firebase.database().ref(home.user.uid+"/lists");
            var lists = $firebaseArray(listRef);
            home.lists=lists;
            for(i=0;i<home.user.displayName.length;i++){
                if(home.user.displayName[i]==" "){
                    home.dName=home.user.displayName.substr(0,i);
                    break;
                }
            }
        } else {
           $location.path("/"); 
        }
    });

    // console.log(result);
    
    
    home.add=function(){
        home.lists.$add({"name":home.list});
        listObj={};
        listObj.name=home.list;
        listObj.tasks=[];
        todolist.push(listObj);
        home.list="";
    }

    home.delete=function(i){
        home.lists.$remove(i);
    }
    home.signOut=function(){
         logged[0]=false;
         $location.path("/");
    }
}

function firstCtrl($firebaseArray,$routeParams,$location,$firebaseAuth,logged){
    var todo=this;
    todo.tasks=[];
    todo.name=$routeParams.listitem;
     todo.addTask=addTask;
    todo.editMode=false;
    todo.model={};
    todo.saveIndex=0;
    cId=0;

    var auth =  $firebaseAuth();
    auth.$onAuthStateChanged(function(user) {
        if (user) {
          todo.user=user;
          var taskRef = firebase.database().ref(todo.user.uid+"/tasks").child(todo.name);
          todo.tasks = $firebaseArray(taskRef);
          for(i=0;i<todo.user.displayName.length;i++){
                if(todo.user.displayName[i]==" "){
                    todo.dName=todo.user.displayName.substr(0,i);
                    break;
                }
            }

          todo.tasks.$loaded().then(function(){
          console.log(todo.tasks.length);
          todo.totalTasks=todo.tasks.length;
          todo.completedTasks=0;
          cId=0;
          for(i=0;i<todo.tasks.length;i++){
            if(todo.tasks[i].status==1)
                todo.completedTasks=todo.completedTasks+1;
            if(todo.tasks[i].id>cId)
                cId=todo.tasks[i].id;
        }
        });
        } else {
           $location.path("/"); 
        }
    });

    

   
    
    
    
    
    todo.check=0;
    // taskObj={};
    

    function addTask(){
        cId=cId+1;
        taskObj={};
        taskObj.name=todo.task;
        taskObj.status=0;
        taskObj.id=cId;
        todo.tasks.$add(taskObj);
        todo.task="";
        todo.totalTasks=todo.totalTasks+1;
        // console.log(todo.tasks);
    }
    todo.deleteTask=function(id){
        todo.totalTasks=todo.totalTasks-1;
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        if(todo.tasks[j].status==1)
            todo.completedTasks=todo.completedTasks-1;
        todo.tasks.$remove(j);
        
    }
    todo.editTask=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        todo.task=todo.tasks[j].name;
        todo.editMode=true;
        todo.saveIndex=j;
    }
    todo.updateTask=function(){

        todo.tasks[todo.saveIndex].name=todo.task;
        todo.tasks.$save(todo.saveIndex);
        todo.editMode=false;
        todo.task="";
    }
    todo.setStatus=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        todo.tasks[j].status=1;
        todo.tasks.$save(j);
        todo.completedTasks=todo.completedTasks+1;
    }
    todo.moveDown=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        if(j!=todo.tasks.length-1){
            //  var tempObject = todo.tasks.splice(j, 1, todo.tasks[j + 1])[0];
            //  todo.tasks.splice(j+1, 1, tempObject);
            //  todo.tasks.$save(j);
            //  todo.tasks.$save(j+1);

            var temp=todo.tasks[j+1].name;
            todo.tasks[j+1].name=todo.tasks[j].name;
            todo.tasks[j].name=temp;
            
            var temp=todo.tasks[j+1].id;
            todo.tasks[j+1].id=todo.tasks[j].id;
            todo.tasks[j].id=temp;
            
            var temp=todo.tasks[j+1].status;
            todo.tasks[j+1].status=todo.tasks[j].status;
            todo.tasks[j].status=temp;
            
            todo.tasks.$save(j);
            todo.tasks.$save(j+1);

            



        }
       
        
    }

    todo.moveUp=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        if(j!=0){
            //  var tempObject = todo.tasks.splice(j-1, 1, todo.tasks[j])[0];
            //  console.log(tempObject);
            //  console.log(todo.tasks.splice(j, 1, tempObject));
            //  todo.tasks.$save(j-1);
            //  todo.tasks.$save(j);
            var temp=todo.tasks[j-1].name;
            todo.tasks[j-1].name=todo.tasks[j].name;
            todo.tasks[j].name=temp;
            
            var temp=todo.tasks[j-1].id;
            todo.tasks[j-1].id=todo.tasks[j].id;
            todo.tasks[j].id=temp;
            
            var temp=todo.tasks[j-1].status;
            todo.tasks[j-1].status=todo.tasks[j].status;
            todo.tasks[j].status=temp;
            
            
            todo.tasks.$save(j-1);
            todo.tasks.$save(j);
        }
       
        
    }


    todo.signOut=function(){
         logged[0]=false;
         $location.path("/");
    }

    
}