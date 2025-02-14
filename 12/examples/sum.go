package main

import "fmt";
//Structures

type student struct{
	Name string
	regno float64
	Dept string
}

func main(){
	// ifelseDemo()
	 greater()
	// forcondi()
	// printdemo()
	// array()
	st:=student{Name: "anc",regno:12.2,Dept:"cse"}
	fmt.Println(st)
	fmt.Println("Name:",st.Name,"\nReg no.:",st.regno,"\nDepartment:",st.Dept)
}

func ifelseDemo(){
	var age int
	fmt.Println("Enter age") 
	fmt.Scanln(&age)
	if age>18{
		fmt.Println("Adult")
	}else{
	fmt.Println("Child")
	}
}

func printdemo(){
	sum:=0;
	for i:=0;i<5;i++ {
		sum +=i
	}
	fmt.Println(sum)
}

func greater(){
	var a,b,c int
	// fmt.Scanln(&a,&b,&c) cannot be used
	fmt.Scanln(&a)
	fmt.Scanln(&b)
	fmt.Scanln(&c)


	if a>b && a>c {
		fmt.Println(a," is greater")
	} else if b>a && b>c {
		fmt.Println(b," is greater")

	} else {
		fmt.Println(c," is greater")
	}
}

func forcondi() {
	n:=1
	for n < 5 {
		n *= 2
	}
	fmt.Println(n)
}

func array(){
	strings:=[]string{"hi","go","developer"}
	for _, s:=range strings {
		fmt.Println(s)
	}
}

