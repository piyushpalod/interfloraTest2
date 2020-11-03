import store from '../store'

const pc = new class PC {
    constructor(){}

    calcPoints(){
        let points = store.getters.getBPointsRaw

        //Contains the type of points. 0 = regular points, 1 = spare, 2 = strike
        let pointType = []
        let totalScore = []
        
        // Walk though the recived points
        for (let index = 0; index < points.length; index++) {
            if ( points[index][0] == 10 ){
              // We have a strike
              pointType.push(2)
            }
            else if ( points[index][0] + points[index][1] == 10 ) {
              // Not a strike, so check for spare
              pointType.push(1)
              
            } else {
              pointType.push(0)
             }

          }
          const length = pointType.length - 1 

          for (let index = 0; index < pointType.length && index < 10; index++) {
            let score
            
            switch (pointType[index]) {
              case 0:
                //regular points
                score = points[index][0] + points[index][1]
                if (index == 0) {
                  totalScore.push(score)
                } else {
                  totalScore.push(score + totalScore[index - 1])
                }
                            
                break;
              case 1:
                //Spare
                if (index == length){
                  // Special case, since on last entry
                  score = 10
                } else {score = 10 + points[index + 1][0]}                
                if (index == 0) {
                  totalScore.push(score)
                } else {                  
                  totalScore.push(score + totalScore[index - 1])
                }
                break;
              case 2:
                //Strike
                if (index == 10)
                {
                  if (pointType[index] == 2){
                    score = 10 + points[index + 1][0] + points[index + 1][1]
                  } else {
                    score = points[index][0] + points[index][1]
                  }

                }
                else if (index == length) {
                  // Special case, since last entry
                    score = points[index][0] + points[index][1]
                } else if ( index == length -1)
                {
                  score = 10 + points[index + 1][0] + points[index + 1][1]
                }
                else {
                  //checks if the next round is a strike
                  if (pointType[index + 1] == 2) {
                    if (index > length - 2) {
                      score = 20 + points[index + 1][1]
                    } else {
                      score = 20 + points[index + 2][0]
                    } 
                  } else {
                    //takes the points of the next round
                    score = 10 + points[index + 1][0] + points[index + 1][1]
                  }
                }
                if (index == 0) {
                  totalScore.push(score)
                } else {
                  totalScore.push(score + totalScore[index - 1])
                }
                break;
              default:
                break;
            }
          }
          store.commit('UPDATE_BSCORE', totalScore)
    }
}

export {pc};