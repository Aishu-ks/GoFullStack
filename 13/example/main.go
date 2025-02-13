package main

import (
	 "fmt"
)
func f1(){
	fmt.Println("this is beginning of f1 func")

	fmt.Println("this is end of f1 func")
}

func f2(){
	fmt.Println("this is beginning of f2 func")

	fmt.Println("this is end of f2 func")
}

func f3(){
	fmt.Println("this is beginning of f3 func")

	fmt.Println("this is end of f3 func")
}

func main(){
	fmt.Println("starting main")
	defer f1()
	// except this func all others will be executed
	f2()
	f3()
	fmt.Println("end of main")
}