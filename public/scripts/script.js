/*
Animal readings descriptions taken from https://www.primalastrology.com/animal-spirit-chart.html
*/

let foxDesc = "Those who have the Fox spirit animal are elegant, charming, and impossible to ignore. Whether you love them or hate them, Foxes have a naturally ability to influence others without trying. Foxes are born leaders but are also extremely independent. They are wise and cunning, and don’t take risks until they have thoroughly evaluated the situation. Others know to follow a Fox’s lead even though Foxes rarely try to recruit followers.";
let doveDesc = "Independent, energetic, and adventurous, those who have the Dove spirit animal love life and long for new experiences. Doves are always looking forward; they rarely dwell on the past. Doves are often restless, which can lead them to take risks in life. They are also lucky, though, so most of the time everything works out just fine.";
let octopusDesc = "Loyal, ambitious, and intense, those who have the Octopus spirit animal prefer to deal in facts rather than emotions. Though not necessarily unfriendly, members of this sign can be fairly anti-social. To be more specific, they tend to be uncomfortable in most social situations. Octopuses often don’t feel like they fit in or know what to say in social situations. Instead, they prefer time alone or with a couple of their closest friends with whom they share a great deal of the same ideals.";
let salamanderDesc = "Sensitive, caring, and idealistic, those who have the Salamander spirit animal are intelligent but fragile individuals who have a unique set of challenges set up for them. Humanitarian and idealistic, salamanders will face many arduous emotional events, many of which may end in disappointment. Yet, there is a very intentional reason for these lessons."
let beeDesc = "Those who have the Bee spirit animal are as hard working, optimistic, and straight-forward as their animal namesake. In the animal kingdom, worker bees spend their lives grinding away toward a higher purpose while at the same time enhancing and improving the world around them by pollinating flowers, providing honey, and sacrificing themselves for the good of their hive.";

/*
Name: spiritFinder
Input: Someone's name
Output: A "Spirit Number"
Description: Does math involving a name to give a "Spirit Number"
             which can later be used to find a Spirit Animal.
*/
function spiritFinder(name){
    spiritNumber = (name.length * name.charCodeAt(0)) % 5;

    return spiritNumber;
}

$( document ).ready(function() {
    /* Put the Sunglasses on The Doge™ */
    $('#memeSunglasses').click(function(){
        console.log("position:, ", $("#memeSunglasses").position())
      }); 

    $("#memeSunglasses").draggable({ stop: function(){
        if($("#memeSunglasses").position().left > 175 && $("#memeSunglasses").position().left < 250  && $("#memeSunglasses").position().top > 340 && $("#memeSunglasses").position().top < 410){
            console.log("doge");
          $("#wowText").text("WOW! The Doge™ is looking pretty cool!");
      }
    }
     });

    /* Spirit Animal Finder */
    $("#submit").click(function(){
        let name = $('#name').val();
        let animal = spiritFinder(name);
        console.log("Spirit Number is " + animal);

        switch(animal){
            case 0:
                $("#animalTitle").text(name + "'s spirit animal is the Fox");
                $("#animalDesc").text(foxDesc);
                break;
            case 1:
                $("#animalTitle").text(name + "'s spirit animal is the Dove");
                $("#animalDesc").text(doveDesc);
                break;
            case 2:
                $("#animalTitle").text(name + "'s spirit animal is the Octopus");
                $("#animalDesc").text(octopusDesc);
                break;
            case 3:
                $("#animalTitle").text(name + "'s spirit animal is the Salamander");
                $("#animalDesc").text(salamanderDesc);
                break;
            case 4:
                $("#animalTitle").text(name + "'s spirit animal is the Bee");
                $("#animalDesc").text(beeDesc);
                break;
            default:
                console.log("ERROR: No spirit animal found");
        }
    });

});