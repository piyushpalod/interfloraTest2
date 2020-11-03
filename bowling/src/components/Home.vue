<template>
<div class="container-fluid">
    <h1 class="display-1">Bowling Scores</h1>
        <div>
            <button type="button" class="btn btn-primary" name="button" squared v-on:click="getPoints()">Get bowling points</button>
        </div>
        <div class="spinner-border text-primary mt-3" role="status" v-if="getPointsPressed">
          <span class="sr-only">Loading...</span>
        </div>
        <br>
        <div>
            <h1>Points</h1>
            <p class="font-weight-normal">{{showPoints}}</p>
        </div>
        <div>
            <h1>Score</h1>
            <p class="font-weight-normal">{{showScore}}</p>  
        </div>
        <div>
            <button type="button" class="btn btn-primary" squared v-on:click="sendScore()">Send bowling score</button>
        </div>
        <div class="text-center" >
          <div class="spinner-border text-primary mt-3" role="status" v-if="postScorePressed">
            <span class="sr-only">Loading...</span>
          </div>
            <p v-if="showResponse.status == '200'" class="mt-3 font-weight-bold text-success">Score posted with code: {{showResponse.status}} , and success: {{showResponse.success}}</p>
            <p v-else-if="showResponse.status == '400'" class="mt-3 font-weight-bold text-danger"> ERROR Failed to post with code: {{showResponse.status}} , reason: {{showResponse.success}}</p>
        </div>

</div>
</template>
<script>
import store from '../store'
export default {
    name: 'Home',
    data: function () {
        return {
        getPointsPressed: false,
        postScorePressed: false,
        response: false
    }   
},
    methods: {
        getPoints(){
            store.dispatch('fetchPoints')
            this.getPointsPressed = true
        },
        sendScore(){
            store.dispatch('postScore')
            this.postScorePressed = true
        }
    },computed: {
        showPoints() {
            return store.getters.getBPoints
        },
        showScore() {
            return  store.getters.getBScore.join(' - ')  
        },
        showResponse() {
            return store.getters.getSuccess
        }
    }, watch: {
        showPoints(){
            this.getPointsPressed = false
        },
        showResponse() {
            this.postScorePressed = false
        }
    }
}
</script>

<style>
</style>