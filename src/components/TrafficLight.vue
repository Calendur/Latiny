<style>
.trafficlight{
    background: #222;
    background-image: linear-gradient(transparent 2%, #111 2%, transparent 3%, #111 30%);
    /*width: 40em;    height: 14em;*/
    width: 90%;
    padding-bottom: 31.5%;
    margin-left: 5%;
    border-radius: 20px;
    position: relative;
    border: solid 5px #333;
}

.red{
    background: red;
    background-image: radial-gradient(brown, transparent);
    background-size: 5px 5px; 
    width: 25%;
    padding-bottom: 25%;
    border-radius: 50%;
    position: absolute;
    top: 15%;
    left: 70%;
    opacity: 80%;
    border: dotted 2px red;
    box-shadow: 
      0 0 20px #111 inset,
      0 0 10px red;
}

.yellow{
    background: yellow;
    background-image: radial-gradient(orange, transparent);
    background-size: 5px 5px;
    width: 25%;
    padding-bottom: 25%;
    border-radius: 50%;
    border: dotted 2px yellow;
    position: absolute;
    top: 15%;
    left: 37.5%;
    opacity: 80%;
    box-shadow: 
      0 0 20px #111 inset,
      0 0 10px yellow;
}

.green{
    background: green;
    background-image: radial-gradient(lime, transparent);
    background-size: 5px 5px;
    width: 25%;
    padding-bottom: 25%;
    border-radius: 50%;
    border: dotted 2px lime;
    position: absolute;
    top: 15%;
    left: 5%;
    opacity: 80%;
    box-shadow: 
      0 0 20px #111 inset,
      0 0 10px lime;
}
</style>
<template>
    <div class="trafficlight">
        <div class="red" @click="$emit('red')"></div>
        <div class="yellow" @click="$emit('yellow')"></div>
        <div class="green" @click="$emit('green')"></div>
    </div>
</template>
<script setup lang="ts">

</script>