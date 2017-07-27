# RESTful Routing

## Introduction

* Define REST and explain WHY it matters
* List of all  RESTful routes
* Show example of RESTful routing in practice

_REST(Representational State Transfer) - a mapping between HTTP routes and CRUD_  

**C**reate  
**R**ead
**U**pdate
**D**estroy  

REST is good because it's a predictable pattern. Sort of like an industry standard.

There are 7 restful Routes:

|	Name	|	Path			|	HTTP Verb	|	Purpose								|
|	---		|	---				|	---			|	---									|
|	Index	|	/dogs			|	GET			|	List all dogs						|
|	New		|	/dogs/new		|	GET			|	Show new dog form 					|
|	Create	|	/dogs			|	POST		|	Create a new dog, then redirect		|
|	Show	|	/dogs/:id		|	GET			|	Show info about single dog			|
|	Edit	|	/dogs/:id/edit	|	GET			|	Show edit form for single dog		|
|	Update	|	/dogs/:id		|	POST		|	Update a single dog, then redirect	|
|	Destroy	|	/dogs/:id		|	DESTROY		|	Delete a single dog, then redirect	|