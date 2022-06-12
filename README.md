# zkMinesweeper Game

## Install
Install the required node modules by running:

```shell
yarn
```

To compile the circuits and run the tests, run following commands

```shell
yarn compile
yarn test
```

## Test Cases

### Full Solution
The first test is about full solution at the end of the game. The following image shows the solution for this test case. M means that we have mine. The number shows counts neighborhood mines.

 ![image](https://user-images.githubusercontent.com/30844607/173244331-b27863c0-6c91-4c71-ae71-f7b3de623239.png)

We represent the above game with following feedback array. We represent 2d matrix as row based 1d array. For mines we used 9.
```
[9,2,2,9,2,9,1,0,0,0,
3,9,2,1,2,1,1,0,0,0,
9,3,2,0,0,0,0,0,0,0,
2,9,1,0,0,0,0,0,0,0,
1,1,2,1,1,0,0,0,0,0,
0,0,2,9,2,0,0,0,0,0,
1,2,4,9,2,0,0,0,0,0,
1,9,9,2,1,0,0,0,0,0,
1,2,2,1,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0]
```

### Not Finished Game
The second test is about proving the given feedback is correct before game ends. Here we have unknown regions. We can prove that the given feedback is correct and the solution is not changed during the game.

![image](https://user-images.githubusercontent.com/30844607/173244448-cf62bd6b-99aa-4e43-8ed7-f1fcbfd55f93.png)

We represent the above game with following feedback array. We represent 2d matrix as row based 1d array. For unknown region we used 10.
```
[10,2,2,10,2,10,1,0,0,0,
10,10,2,1,2,1,1,0,0,0,
10,3,2,0,0,0,0,0,0,0,
10,10,1,0,0,0,0,0,0,0,
1,1,2,1,1,0,0,0,0,0,
0,0,2,10,2,0,0,0,0,0,
1,2,4,10,2,0,0,0,0,0,
10,10,10,2,1,0,0,0,0,0,
1,2,2,1,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0]
```

## Licensing, Authors, Acknowledgements

I would like to thank [zku.one](https://zku.one/) for creating a platform to learn and upscale my zero knowledge proof skills.