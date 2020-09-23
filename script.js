$(document).ready(function(){

function createSubTemp( dow, img, temp, index=1){
    var subTempTemplate =
    `<div class="sub-temp" data-index=${index}>
        <div class="dow">
        ${dow}
        </div>
        <img src=${img}>
        <p>${temp}<sup>o</sup></p>
    </div>`

    return subTempTemplate
}
// var container = $ (".sub-temp-container")
// var subTemp = createSubTemp ("SUN", "img/icon_sunny.png",20)
// var subTemp2 = createSubTemp ("MON", "img/icon_sunny.png",20)
// var subTemp3 = createSubTemp ("TUE", "img/icon_sunny.png",20)
// var subTemp4 = createSubTemp ("WEB", "img/icon_sunny.png",20)
// var subTemp5 = createSubTemp ("THU", "img/icon_sunny.png",20)
// var subTemp6 = createSubTemp ("FRI", "img/icon_sunny.png",20)
// var subTemp7 = createSubTemp ("SAT", "img/icon_sunny.png",20)

// var content = subTemp + subTemp2 + subTemp3 + subTemp4 + subTemp5 + subTemp6 +subTemp7
// console.log(content)
// container.html(content) // thay the hoan toan noi dung ben trong

var weatherData
$(document).ready(function(){ 
    $.ajax({
        url:"data.json",
        dataType: "json",
        success: function(data){
            // console.log("lay ra du lieu", data)
            // $("#ajax-data").html(data)
            console.log("da lay du lieu")
            weatherData = data
            setCurrenWeather()
            setNextDaysWeather()
        },
        error(err){
            console.log(err)
        }
    })

    function setCurrenWeather(){
        //cach lay du lieu
        //weatherData.current.weather
        console.log(weatherData.current.weather)
       

        const weather = weatherData.current.weather[0]
        var imgSrc = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
        console.log (imgSrc)
        $(".main-temp img").attr("src", imgSrc)

        console.log(weatherData.current.temp)
        var celsius = weatherData.current.temp - 273
        var tempstr = `${celsius.toFixed(0)}<sup>o<sup>`
        $(".main-temp .temp p").html(tempstr)
    }

    function setNextDaysWeather(){
        const dailyDatas = weatherData.daily
        var html = []
        console.log(dailyDatas)
        //lay sub temp container
        var container = $(".sub-temp-container")
        var daysArray = ['Sun','Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat'];

        // dailyDatas.forEach(item => {
        for(var i = 0; i < 7; i++)
        {
            var item = dailyDatas[i]
            // Sup temp container
        
        var imgSrc = `http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`
        
        console.log(item.temp)
        var dowIndex = new Date(item.dt *1000).getDay()
        console.log(dowIndex)
            
        var celsiusTemp = item.temp.max - 273
        var tempStr = celsiusTemp.toFixed(0)
        
        // Create sub-temp from template
        var strSubTemp = createSubTemp(daysArray[dowIndex], imgSrc, tempStr)

        html.push(strSubTemp)
        };
        var fullSubTempStr = html.join("")
        container.html(fullSubTempStr)
    }
    


    // setCurrenWeather()

    $(".main-temp").on("click", () =>{
    //   alert("click me")
    })

    $("#buttonclick").on("click", () =>{
        console.log("click")
    })
    printhtml = () =>{
    }
})
})
