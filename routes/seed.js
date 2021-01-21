const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');

const seedData = [
    {
        title: "Ram Mandir bhoomi pujan: PM Modi lays silver brick for Ram Lalla's new home in Ayodhya",
        image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202008/PTI05-08-2020_000126B_0.jpeg?S0ki8vnR8GceVhcaJlOQQlXFno2V29op&size=770:433",
        content: "The decades-long wait to see a permanent home for Lord Ram built in Ayodhya, the perceived birthplace of the deity ended on Wednesday, with Prime Minister Narendra Modi laid the foundation stone for the Ram temple on the site in a grand ceremony. Not only was the bhoomi pujan in Ayodhya a reason to celebrate for many in the nation but also signalled the fulfilment of a long-held goal of the Bharatiya Janata Party."
    },
    {
        title: "Bihar DGP on Sushant Singh Rajput death case: Rhea Chakraborty missing, how will we probe?",
        image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202008/SSR_Gupteshwar.jpeg?SXYhLBqO2Ag11v8pAJvPLfvHdZC6Y856&size=770:433",
        content: "Bihar DGP Gupteshwar Pandey today said that they are unable to go ahead with the investigation of Sushant Singh Rajput's death because the 'prime accused' in the case, Rhea Chakraborty is still absconding. Despite several attempts, Rhea isn't coming forward to take part in the investigation. Pandey also added that in addition to Rhea being missing, the BMC is 'forcefully' quarantining their officials in Mumbai, because of which they cannot take the investigation forward. This was in reference to Bihar IPS officer Vinay Tiwari being quarantined in Mumbai on Sunday, after he arrived in the city to head the team of Bihar police in the investigation."
    },
    {
        title: "India rejects China's attempt to raise Kashmir issue at UNSC, says don’t interfere in internal affairs",
        image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202008/China_India.jpeg?KXK2v9vgKBQ35wM2I6h22Yh3sVXrek8m&size=770:433",
        content: "India hit out at China for making yet another effort to raise the Kashmir issue at the UN Security Council as it asked Beijing to draw proper conclusions from such 'infructuous attempts' and 'firmly' rejected its 'interference' in the country's internal affairs. China on Wednesday backed an attempt by Pakistan to discuss the Kashmir issue at the UN Security Council. This coincided with the first anniversary of the reorganisation of Jammu and Kashmir by India."
    }
];

function seedDB(){

    // REMOVE ALL DATABASE
    Blog.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("All blogs deleted")

            // SEED WITH NEW DATA
            seedData.forEach(function(data){
                Blog.create(data, function(err, addedBlog){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Blog added");
                        Comment.create(
                            {
                                author: "Colt",
                                text: "Colt is a nice teacher"
                            }, function(err, addedComment){
                                if(err){
                                    console.log(err);
                                } else {
                                    addedBlog.comments.push(addedComment);
                                    addedBlog.save(function(err){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            console.log("Comment created and saved");
                                        }
                                    });
                                }
                            });
                    }
                });
            });
        }
    });
};

module.exports = seedDB;