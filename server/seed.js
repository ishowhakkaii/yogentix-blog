// ============================================
// SEED FILE — Adds real articles to database
// Run once: node server/seed.js
// ============================================

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const Article = require('./models/Article');

const articles = [
    {
        title: "The Ancient Art of Sun Salutation: A Complete Guide",
        category: "yoga",
        author: "Yogentix Team",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80",
        summary: "Discover the transformative power of Surya Namaskar — a flowing sequence of 12 poses that energizes your body, calms your mind, and connects you with ancient yogic tradition.",
        content: `Sun Salutation, or Surya Namaskar, is one of the most foundational sequences in yoga. Practiced for thousands of years, this flowing series of 12 postures is designed to honor the sun — the source of all life on Earth. Whether you're a complete beginner or an experienced yogi, Sun Salutation offers profound benefits for both body and mind.

The sequence begins and ends in a standing position, creating a beautiful cycle of movement and breath. Each pose flows seamlessly into the next, creating a moving meditation that warms the body, stretches every major muscle group, and brings a deep sense of calm and focus.

The 12 poses of Sun Salutation include Prayer Pose, Raised Arms Pose, Standing Forward Bend, Lunge Pose, Plank Pose, Eight-Limbed Pose, Cobra Pose, Downward Dog, and back through the sequence. Each pose is synchronized with either an inhale or exhale, making the breath an integral part of the practice.

One of the greatest benefits of Sun Salutation is its accessibility. You can practice it anywhere, anytime, without any equipment. A single round takes just 3-4 minutes, making it perfect for busy mornings. Many practitioners start their day with 5-10 rounds, finding that it provides more sustained energy than a cup of coffee.

Regular practice of Sun Salutation improves flexibility, builds strength, aids digestion, reduces stress and anxiety, and promotes better sleep. It's also known to improve cardiovascular health, as the flowing movements raise the heart rate gently and consistently.

To begin your Sun Salutation practice, start with just 2-3 rounds each morning. Focus on synchronizing your breath with each movement. Move slowly and mindfully, paying attention to how each pose feels in your body. Over time, you can increase the number of rounds and deepen your stretches.

Remember, yoga is not about perfection — it's about practice. Every body is different, and your Sun Salutation will look uniquely yours. Honor your body's limitations and celebrate its strengths. The sun rises every day without judgment, and so should your practice.`
    },
    {
        title: "5 Pranayama Breathing Techniques for Inner Peace",
        category: "yoga",
        author: "Yogentix Team",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
        summary: "Learn five powerful yogic breathing techniques that can instantly reduce stress, boost energy, and bring clarity to your mind — no yoga mat required.",
        content: `Pranayama, the ancient yogic science of breath control, is one of the most powerful tools available for transforming your mental and physical health. The word comes from Sanskrit: 'prana' meaning life force, and 'ayama' meaning to extend or control. Through conscious breathing, we can directly influence our nervous system, emotions, and state of mind.

The first technique is Nadi Shodhana, or Alternate Nostril Breathing. This balancing breath involves closing one nostril while breathing through the other, then alternating. Close your right nostril with your thumb, inhale through the left for 4 counts. Close both nostrils and hold for 4 counts. Release the right nostril and exhale for 4 counts. Then inhale through the right, hold, and exhale through the left. This completes one cycle. Practice 5-10 cycles for deep calm and mental clarity.

The second technique is Ujjayi Breathing, often called Ocean Breath. Slightly constrict the back of your throat as you breathe in and out through your nose, creating a soft rushing sound like ocean waves. This warming breath is perfect during yoga practice and helps build internal heat while maintaining focus.

The third technique is Kapalabhati, or Skull-Shining Breath. This energizing technique involves short, forceful exhales through the nose while the inhales happen naturally. Start with 20 rapid exhales, then take a deep breath in and hold. This practice clears the mind, energizes the body, and strengthens the abdominal muscles.

The fourth technique is Bhramari, or Humming Bee Breath. Close your ears with your thumbs, place your fingers over your eyes, and hum like a bee as you exhale. The vibration created by the humming sound calms the nervous system and is especially effective for reducing anxiety and insomnia.

The fifth technique is Box Breathing, also known as Sama Vritti. Inhale for 4 counts, hold for 4 counts, exhale for 4 counts, and hold for 4 counts. This simple yet powerful technique is used by Navy SEALs to maintain calm under pressure. It's perfect for stressful moments throughout your day.

Start with just 5 minutes of pranayama daily. Choose one technique that resonates with you and practice it consistently. Over time, you'll notice improved focus, reduced stress, better sleep, and a greater sense of inner peace. Your breath is always with you — it's the most portable wellness tool you'll ever have.`
    },
    {
        title: "Turmeric: The Golden Spice That Heals",
        category: "herbs",
        author: "Yogentix Team",
        image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=900&q=80",
        summary: "Explore the incredible healing properties of turmeric — from reducing inflammation to boosting brain health. Learn how to use this ancient golden spice in your daily life.",
        content: `Turmeric has been revered in Ayurvedic medicine for over 4,000 years. This vibrant golden spice, derived from the root of the Curcuma longa plant, contains a powerful compound called curcumin that has been the subject of thousands of scientific studies. Its healing properties are so impressive that many researchers consider it one of the most effective nutritional supplements in existence.

The primary active compound in turmeric, curcumin, is a potent anti-inflammatory agent. Chronic inflammation is believed to be at the root of many modern diseases, including heart disease, cancer, metabolic syndrome, and Alzheimer's disease. Curcumin targets inflammation at the molecular level, blocking NF-kB, a molecule that travels into the nuclei of cells and turns on genes related to inflammation.

Turmeric is also a powerful antioxidant. Free radicals — unstable molecules that damage cells — are believed to be a major contributor to aging and disease. Curcumin neutralizes free radicals directly and also stimulates your body's own antioxidant enzymes, providing a double layer of protection.

One of the most exciting areas of turmeric research involves brain health. Curcumin has been shown to increase levels of Brain-Derived Neurotrophic Factor (BDNF), a growth hormone that functions in the brain. Low levels of BDNF have been linked to depression and Alzheimer's disease. By boosting BDNF, turmeric may help delay or reverse age-related brain decline.

To incorporate turmeric into your daily routine, try making Golden Milk — a traditional Ayurvedic drink. Warm a cup of milk (dairy or plant-based) with one teaspoon of turmeric powder, a pinch of black pepper (which increases curcumin absorption by 2,000%), a dash of cinnamon, and a drizzle of honey. This soothing beverage is perfect before bed.

You can also add turmeric to smoothies, soups, rice dishes, and salad dressings. For maximum absorption, always pair turmeric with black pepper and a healthy fat like coconut oil or olive oil. While turmeric is generally safe, those on blood-thinning medications should consult their doctor before taking large supplemental doses.

Nature has given us an extraordinary healing tool in turmeric. By making this golden spice a regular part of your diet, you're tapping into thousands of years of traditional wisdom backed by modern science.`
    },
    {
        title: "Lavender: Nature's Calming Remedy for Mind and Body",
        category: "herbs",
        author: "Yogentix Team",
        image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=80",
        summary: "From reducing anxiety to improving sleep quality, lavender is one of nature's most versatile healing herbs. Discover how to harness its calming power every day.",
        content: `Lavender, with its distinctive purple flowers and intoxicating fragrance, has been used as a healing herb for over 2,500 years. Ancient Egyptians used it in mummification, Romans added it to their baths (the name 'lavender' comes from the Latin 'lavare,' meaning 'to wash'), and medieval Europeans used it to protect against disease. Today, modern science confirms what ancient civilizations knew intuitively — lavender is a remarkably powerful healing plant.

The primary benefit of lavender is its profound ability to reduce anxiety and promote relaxation. Multiple clinical studies have shown that inhaling lavender essential oil significantly reduces cortisol levels — the body's primary stress hormone. One study published in the Journal of Alternative and Complementary Medicine found that lavender aromatherapy reduced anxiety in patients by up to 40%.

Lavender is also one of the most effective natural sleep aids available. Research has shown that inhaling lavender before bed improves sleep quality, increases sleep duration, and helps people feel more refreshed upon waking. For those suffering from insomnia, placing a few drops of lavender essential oil on your pillow or using a bedside diffuser can make a significant difference.

Beyond mental health, lavender has impressive physical healing properties. Its anti-inflammatory and antiseptic qualities make it effective for treating minor burns, insect bites, and skin irritations. Lavender oil can be applied diluted directly to the skin to speed healing and reduce scarring.

To incorporate lavender into your daily life, try brewing lavender tea by steeping dried lavender buds in hot water for 5-10 minutes. This calming tea is perfect for evening relaxation. You can also add a few drops of lavender essential oil to a warm bath, use it in a diffuser while meditating or working, or create a simple room spray by mixing lavender oil with water in a spray bottle.

Growing your own lavender is also wonderfully rewarding. The plant thrives in sunny, well-drained locations and requires minimal maintenance. Having fresh lavender in your garden provides a continuous supply for teas, sachets, and aromatherapy, while also attracting beneficial pollinators like bees and butterflies.

In a world that constantly demands our attention and energy, lavender offers a gentle, natural way to find calm. Whether you sip it, smell it, or soak in it, this remarkable herb reminds us that sometimes the most powerful medicine grows quietly in a garden.`
    },
    {
        title: "Morning Rituals: 7 Habits for a Balanced and Energized Day",
        category: "wellness",
        author: "Yogentix Team",
        image: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&w=900&q=80",
        summary: "Transform your mornings, transform your life. Learn seven science-backed morning rituals that set the foundation for energy, focus, and well-being all day long.",
        content: `How you start your morning sets the tone for your entire day. Ancient wisdom traditions — from Ayurveda to Stoic philosophy — have long emphasized the importance of morning rituals. Modern neuroscience now confirms that what we do in the first hour after waking has a profound impact on our mood, productivity, and overall health throughout the day.

The first ritual is to wake with intention. Before reaching for your phone, take three deep breaths and set a simple intention for the day. This could be as simple as 'Today, I choose calm' or 'Today, I will be present.' This practice activates the prefrontal cortex — the rational, intentional part of your brain — before the reactive, stressed part takes over.

The second ritual is hydration. After 7-8 hours of sleep, your body is dehydrated. Drink a full glass of warm water with lemon upon waking. This simple practice jumpstarts your metabolism, aids digestion, flushes toxins, and provides a natural energy boost. Add a pinch of Himalayan salt for additional minerals and electrolytes.

The third ritual is movement. Whether it's a full yoga session, a brisk 10-minute walk, or simple stretching, moving your body first thing in the morning increases blood flow, releases endorphins, and shakes off sleep inertia. Even 5 minutes of Sun Salutation can dramatically shift your energy and mood.

The fourth ritual is mindfulness meditation. Sitting quietly for even 5-10 minutes each morning has been shown to reduce anxiety, improve focus, increase emotional resilience, and even strengthen the immune system. Start small — use a simple breath-counting technique and gradually extend your practice over time.

The fifth ritual is nourishing your body with a wholesome breakfast. Choose whole, natural foods that provide sustained energy: fresh fruits, whole grains, nuts, seeds, and herbal teas. Avoid processed sugars and excessive caffeine, which create energy spikes followed by crashes.

The sixth ritual is journaling. Spend 5 minutes writing three things you're grateful for and one thing you'd like to accomplish today. This practice rewires your brain toward positivity and gives your day a clear direction. Gratitude journaling has been scientifically linked to increased happiness, better relationships, and improved physical health.

The seventh ritual is to protect your morning from digital intrusion. Resist checking email, social media, or news for at least the first 30-60 minutes after waking. This precious morning time is when your mind is freshest and most creative. Guard it fiercely. The digital world will still be there when you're ready for it.

Start by adopting just one or two of these rituals. Once they become habitual, add another. Within a few weeks, you'll notice a dramatic shift in your energy, focus, and overall sense of well-being. Your morning is sacred ground — treat it accordingly.`
    },
    {
        title: "The Power of Mindful Meditation: A Beginner's Guide",
        category: "wellness",
        author: "Yogentix Team",
        image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=80",
        summary: "Meditation isn't about emptying your mind — it's about befriending it. This complete beginner's guide will help you start a meditation practice that actually sticks.",
        content: `Meditation has moved from ancient monasteries to mainstream science labs, and for good reason. Thousands of peer-reviewed studies have demonstrated that regular meditation practice physically changes the brain, reducing the size of the amygdala (the brain's fear center) while increasing the thickness of the prefrontal cortex (responsible for focus, decision-making, and emotional regulation).

But here's the most important thing to understand: meditation is not about stopping your thoughts. This is the biggest misconception that prevents people from starting or continuing a practice. Meditation is about changing your relationship with your thoughts — observing them without judgment, like watching clouds pass through the sky.

To begin, find a quiet, comfortable place where you won't be disturbed. Sit in a position that feels natural — on a cushion, a chair, or even lying down. Close your eyes and take three deep breaths to settle in. Then, simply notice your natural breathing pattern without trying to change it. Feel the air entering your nostrils, filling your lungs, and leaving your body.

When your mind wanders — and it will — gently bring your attention back to your breath. This moment of noticing that your mind has wandered and choosing to return to the breath IS the meditation. It's like doing a bicep curl for your brain. Each time you redirect your attention, you're strengthening your ability to focus and be present.

Start with just 3-5 minutes. This may sound insignificant, but consistency matters far more than duration. A daily 5-minute practice will transform your life more than an occasional hour-long session. Set a gentle timer so you don't need to check the clock, and commit to the same time each day.

As your practice develops, you can explore different styles of meditation. Body scan meditation involves slowly directing attention to each part of your body, releasing tension as you go. Loving-kindness meditation focuses on generating feelings of compassion for yourself and others. Walking meditation brings mindfulness to the simple act of walking.

The benefits of regular meditation are extensive and well-documented. Reduced stress and anxiety, improved focus and memory, better emotional regulation, lower blood pressure, improved sleep quality, increased creativity, and a greater sense of overall well-being. Many practitioners report that meditation doesn't just change how they feel during practice — it fundamentally shifts how they experience every moment of their lives.

Remember, there is no such thing as a bad meditation. Some days your mind will be calm and focused. Other days it will be a circus of random thoughts. Both are perfectly normal and perfectly valuable. The only bad meditation is the one you didn't do. Start today, start small, and be patient with yourself. Your mind will thank you.`
    }
];

async function seedDatabase() {
    try {
        console.log('');
        console.log('🌱 Starting database seed...');
        console.log('⏳ Connecting to MongoDB...');

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000
        });

        console.log('✅ Connected to MongoDB');

        // Delete existing articles
        await Article.deleteMany({});
        console.log('🗑️  Cleared old articles');

        // Insert new articles
        var savedArticles = await Article.insertMany(articles);
        console.log('✅ Added ' + savedArticles.length + ' articles!');
        console.log('');

        savedArticles.forEach(function(article) {
            console.log('   📄 ' + article.category.toUpperCase() + ': ' + article.title);
        });

        console.log('');
        console.log('🎉 Database seeded successfully!');
        console.log('🌐 Visit http://localhost:5000 to see your articles!');
        console.log('');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed Error:', error.message);
        process.exit(1);
    }
}

seedDatabase();