export type Exercise = {
  id: string;
  name: string;
  type: "warmup" | "stretch" | "recovery";
  reps_or_time: string;
  target_muscle: string;
  description: string;
  image: string;
};

export type WorkoutDay = {
  dayNumber: number;
  title: string;
  muscleGroup: string;
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  warmups: Exercise[];
  stretches: Exercise[];
};

const placeholderImg = (text: string) =>
  `https://placehold.co/600x400/1e293b/0ea5e9?text=${encodeURIComponent(text)}`;

export const workoutData: WorkoutDay[] = [
  {
    dayNumber: 1,
    title: "Back",
    muscleGroup: "Lats, Rhomboids, Traps",
    estimatedTime: "60 mins",
    difficulty: "Intermediate",
    warmups: [
      {
        id: "w1-1",
        name: "5 min walk, bike, or rowing",
        type: "warmup",
        reps_or_time: "5 min",
        target_muscle: "Full Body",
        description: "Light cardio to increase heart rate.",
        image: "/images/back/walk-bike-row.png",
      },
      {
        id: "w1-2",
        name: "Cat-cow",
        type: "warmup",
        reps_or_time: "10 reps",
        target_muscle: "Spine",
        description: "Spinal flexion and extension.",
        image: "/images/back/cat-cow.png",
      },
      {
        id: "w1-3",
        name: "Thoracic rotations",
        type: "warmup",
        reps_or_time: "10 each side",
        target_muscle: "Thoracic Spine",
        description: "Open up the mid-back.",
        image: "/images/back/thoracic-rotations.png",
      },
      {
        id: "w1-4",
        name: "Band pull-aparts",
        type: "warmup",
        reps_or_time: "15 reps",
        target_muscle: "Rear Delts",
        description: "Activate rear delts and upper back.",
        image: "/images/back/band-pull-aparts.png",
      },
      {
        id: "w1-5",
        name: "Scapular pull-ups or dead hang",
        type: "warmup",
        reps_or_time: "20-30 sec",
        target_muscle: "Scapula",
        description: "Decompress spine and engage lats.",
        image: "/images/back/scapular-pullups-dead-hang.png",
      },
      {
        id: "w1-6",
        name: "Light lat pulldown or row",
        type: "warmup",
        reps_or_time: "2 sets",
        target_muscle: "Lats",
        description: "Specific muscle activation.",
        image: "/images/back/light-lat-pulldown-row.png",
      },
    ],
    stretches: [
      {
        id: "s1-1",
        name: "Child’s pose",
        type: "stretch",
        reps_or_time: "30 sec",
        target_muscle: "Lower Back / Lats",
        description: "Resting pose for back elongation.",
        image: "/images/back/child-pose.png",
      },
      {
        id: "s1-2",
        name: "Lat stretch on bench or pole",
        type: "stretch",
        reps_or_time: "30 sec each side",
        target_muscle: "Lats",
        description: "Deep stretch for latissimus dorsi.",
        image: "/images/back/lat-stretch-bench-pole.png",
      },
      {
        id: "s1-3",
        name: "Seated forward fold",
        type: "stretch",
        reps_or_time: "30 sec",
        target_muscle: "Hamstrings / Back",
        description: "Stretch the posterior chain.",
        image: "/images/back/seated-forward-fold.png",
      },
      {
        id: "s1-4",
        name: "Cross-body rear delt stretch",
        type: "stretch",
        reps_or_time: "30 sec each side",
        target_muscle: "Rear Delts",
        description: "Relieve tension in the shoulders.",
        image: "/images/back/cross-body-rear-delt-stretch.png",
      },
      {
        id: "s1-5",
        name: "Doorframe stretch",
        type: "stretch",
        reps_or_time: "30 sec",
        target_muscle: "Chest / Front Delts",
        description: "Open the chest after pulling movements.",
        image: "/images/back/doorframe-stretch.png",
      },
    ],
  },
  {
    dayNumber: 2,
    title: "Chest",
    muscleGroup: "Pectorals, Anterior Delts",
    estimatedTime: "60 mins",
    difficulty: "Intermediate",
    warmups: [
      { id: "w2-1", name: "5 min treadmill or bike", type: "warmup", reps_or_time: "5 min", target_muscle: "Full Body", description: "Light cardio.", image: placeholderImg("Treadmill") },
      { id: "w2-2", name: "Arm circles", type: "warmup", reps_or_time: "20 sec fwd/back", target_muscle: "Shoulders", description: "Lubricate shoulder joints.", image: placeholderImg("Arm Circles") },
      { id: "w2-3", name: "Band chest openers", type: "warmup", reps_or_time: "15 reps", target_muscle: "Chest", description: "Dynamic chest stretch.", image: placeholderImg("Chest Openers") },
      { id: "w2-4", name: "Wall slides", type: "warmup", reps_or_time: "12 reps", target_muscle: "Shoulders", description: "Improve overhead mobility.", image: placeholderImg("Wall Slides") },
      { id: "w2-5", name: "Scapular push-ups", type: "warmup", reps_or_time: "10 reps", target_muscle: "Serratus Anterior", description: "Engage stabilizing muscles.", image: placeholderImg("Scapular Push-ups") },
      { id: "w2-6", name: "Incline push-ups", type: "warmup", reps_or_time: "10 reps", target_muscle: "Chest", description: "Light chest activation.", image: placeholderImg("Incline Push-ups") },
      { id: "w2-7", name: "Light bench press", type: "warmup", reps_or_time: "2 sets", target_muscle: "Chest", description: "Specific warmup sets.", image: placeholderImg("Bench Press Warmup") }
    ],
    stretches: [
      { id: "s2-1", name: "Doorway chest stretch", type: "stretch", reps_or_time: "30 sec", target_muscle: "Chest", description: "Standard pec stretch.", image: placeholderImg("Doorway Stretch") },
      { id: "s2-2", name: "Pec stretch on wall", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Chest", description: "Isolate each pectoral.", image: placeholderImg("Wall Pec Stretch") },
      { id: "s2-3", name: "Cobra stretch", type: "stretch", reps_or_time: "30 sec", target_muscle: "Abs / Chest", description: "Stretch the anterior chain.", image: placeholderImg("Cobra Stretch") },
      { id: "s2-4", name: "Cross-body shoulder stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Shoulders", description: "Relieve shoulder tension.", image: placeholderImg("Shoulder Stretch") },
      { id: "s2-5", name: "Front shoulder stretch", type: "stretch", reps_or_time: "30 sec", target_muscle: "Front Delts", description: "Hands behind back stretch.", image: placeholderImg("Front Shoulder Stretch") }
    ]
  },
  {
    dayNumber: 3,
    title: "Legs",
    muscleGroup: "Quads, Hamstrings, Glutes, Calves",
    estimatedTime: "75 mins",
    difficulty: "Advanced",
    warmups: [
      { id: "w3-1", name: "5 min brisk walk or cycling", type: "warmup", reps_or_time: "5 min", target_muscle: "Legs", description: "Increase blood flow to legs.", image: placeholderImg("Cycling") },
      { id: "w3-2", name: "Leg swings front/back", type: "warmup", reps_or_time: "12 each leg", target_muscle: "Hips", description: "Dynamic hip mobility.", image: placeholderImg("Leg Swings") },
      { id: "w3-3", name: "Leg swings side/side", type: "warmup", reps_or_time: "12 each leg", target_muscle: "Hips / Adductors", description: "Lateral hip mobility.", image: placeholderImg("Lateral Swings") },
      { id: "w3-4", name: "Hip circles", type: "warmup", reps_or_time: "10 each side", target_muscle: "Hips", description: "Lubricate hip joint.", image: placeholderImg("Hip Circles") },
      { id: "w3-5", name: "Bodyweight squats", type: "warmup", reps_or_time: "15 reps", target_muscle: "Quads / Glutes", description: "Prime the squat pattern.", image: placeholderImg("BW Squats") },
      { id: "w3-6", name: "Walking lunges", type: "warmup", reps_or_time: "10 each leg", target_muscle: "Legs", description: "Unilateral activation.", image: placeholderImg("Walking Lunges") },
      { id: "w3-7", name: "Glute bridges", type: "warmup", reps_or_time: "15 reps", target_muscle: "Glutes", description: "Activate the posterior chain.", image: placeholderImg("Glute Bridges") },
      { id: "w3-8", name: "Ankle mobility rocks", type: "warmup", reps_or_time: "10 each side", target_muscle: "Ankles", description: "Increase dorsiflexion.", image: placeholderImg("Ankle Rocks") }
    ],
    stretches: [
      { id: "s3-1", name: "Standing quad stretch", type: "stretch", reps_or_time: "30 sec each leg", target_muscle: "Quads", description: "Stretch the front of the thigh.", image: placeholderImg("Quad Stretch") },
      { id: "s3-2", name: "Hamstring stretch", type: "stretch", reps_or_time: "30 sec each leg", target_muscle: "Hamstrings", description: "Stretch the back of the leg.", image: placeholderImg("Hamstring Stretch") },
      { id: "s3-3", name: "Figure-4 glute stretch", type: "stretch", reps_or_time: "30 sec each leg", target_muscle: "Glutes", description: "Release tension in the hips.", image: placeholderImg("Figure 4") },
      { id: "s3-4", name: "Hip flexor lunge stretch", type: "stretch", reps_or_time: "30 sec each leg", target_muscle: "Hip Flexors", description: "Open up the hips.", image: placeholderImg("Lunge Stretch") },
      { id: "s3-5", name: "Calf stretch on wall", type: "stretch", reps_or_time: "30 sec each leg", target_muscle: "Calves", description: "Stretch the lower leg.", image: placeholderImg("Calf Stretch") }
    ]
  },
  {
    dayNumber: 4,
    title: "Shoulders",
    muscleGroup: "Deltoids, Traps",
    estimatedTime: "50 mins",
    difficulty: "Intermediate",
    warmups: [
      { id: "w4-1", name: "5 min light cardio", type: "warmup", reps_or_time: "5 min", target_muscle: "Full Body", description: "Get the blood flowing.", image: placeholderImg("Cardio") },
      { id: "w4-2", name: "Arm circles", type: "warmup", reps_or_time: "20 sec each way", target_muscle: "Shoulders", description: "Dynamic warmup.", image: placeholderImg("Arm Circles") },
      { id: "w4-3", name: "Band pull-aparts", type: "warmup", reps_or_time: "15 reps", target_muscle: "Rear Delts", description: "Shoulder health.", image: placeholderImg("Pull-aparts") },
      { id: "w4-4", name: "Wall slides", type: "warmup", reps_or_time: "12 reps", target_muscle: "Shoulders", description: "Overhead mechanics.", image: placeholderImg("Wall Slides") },
      { id: "w4-5", name: "Shoulder dislocates", type: "warmup", reps_or_time: "10 reps", target_muscle: "Shoulders", description: "With band or PVC pipe.", image: placeholderImg("Dislocates") },
      { id: "w4-6", name: "Scapular push-ups", type: "warmup", reps_or_time: "10 reps", target_muscle: "Scapula", description: "Activation.", image: placeholderImg("Scap Pushups") },
      { id: "w4-7", name: "Light overhead press", type: "warmup", reps_or_time: "2 sets", target_muscle: "Shoulders", description: "Movement prep.", image: placeholderImg("OHP Warmup") }
    ],
    stretches: [
      { id: "s4-1", name: "Cross-body shoulder stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Delts", description: "Basic shoulder stretch.", image: placeholderImg("Cross Body Stretch") },
      { id: "s4-2", name: "Overhead triceps/shoulder stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Triceps / Shoulders", description: "Arm behind head.", image: placeholderImg("Overhead Stretch") },
      { id: "s4-3", name: "Doorway front delt stretch", type: "stretch", reps_or_time: "30 sec", target_muscle: "Front Delts", description: "Open the front of the shoulder.", image: placeholderImg("Doorway Stretch") },
      { id: "s4-4", name: "Upper trap stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Traps", description: "Gently pull head to side.", image: placeholderImg("Trap Stretch") },
      { id: "s4-5", name: "Child’s pose with arms long", type: "stretch", reps_or_time: "30 sec", target_muscle: "Shoulders / Lats", description: "Active elongation.", image: placeholderImg("Childs Pose") }
    ]
  },
  {
    dayNumber: 5,
    title: "Biceps",
    muscleGroup: "Biceps Brachii, Forearms",
    estimatedTime: "45 mins",
    difficulty: "Beginner",
    warmups: [
      { id: "w5-1", name: "3-5 min light cardio", type: "warmup", reps_or_time: "3-5 min", target_muscle: "Full Body", description: "General warmup.", image: placeholderImg("Cardio") },
      { id: "w5-2", name: "Arm circles", type: "warmup", reps_or_time: "20 sec", target_muscle: "Shoulders", description: "Joint prep.", image: placeholderImg("Arm Circles") },
      { id: "w5-3", name: "Wrist circles", type: "warmup", reps_or_time: "20 sec", target_muscle: "Wrists", description: "Prepare forearms.", image: placeholderImg("Wrist Circles") },
      { id: "w5-4", name: "Elbow flexion and extension", type: "warmup", reps_or_time: "15 reps", target_muscle: "Elbows", description: "Bodyweight curls.", image: placeholderImg("Elbow Flexion") },
      { id: "w5-5", name: "Light band curls", type: "warmup", reps_or_time: "15 reps", target_muscle: "Biceps", description: "Pump blood to the muscle.", image: placeholderImg("Band Curls") },
      { id: "w5-6", name: "Light hammer curls", type: "warmup", reps_or_time: "12 reps", target_muscle: "Brachialis", description: "Neutral grip prep.", image: placeholderImg("Hammer Curls") },
      { id: "w5-7", name: "Light biceps curl sets", type: "warmup", reps_or_time: "1-2 sets", target_muscle: "Biceps", description: "Specific movement prep.", image: placeholderImg("Curl Warmup") }
    ],
    stretches: [
      { id: "s5-1", name: "Biceps wall stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Biceps", description: "Arm straight against wall.", image: placeholderImg("Biceps Wall Stretch") },
      { id: "s5-2", name: "Wrist flexor stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Forearms", description: "Pull fingers back.", image: placeholderImg("Wrist Flexor") },
      { id: "s5-3", name: "Wrist extensor stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Forearms", description: "Push hand down.", image: placeholderImg("Wrist Extensor") },
      { id: "s5-4", name: "Cross-body shoulder stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Shoulders", description: "General cooldown.", image: placeholderImg("Shoulder Stretch") }
    ]
  },
  {
    dayNumber: 6,
    title: "Triceps",
    muscleGroup: "Triceps Brachii",
    estimatedTime: "45 mins",
    difficulty: "Beginner",
    warmups: [
      { id: "w6-1", name: "3-5 min light cardio", type: "warmup", reps_or_time: "3-5 min", target_muscle: "Full Body", description: "General warmup.", image: placeholderImg("Cardio") },
      { id: "w6-2", name: "Arm circles", type: "warmup", reps_or_time: "20 sec", target_muscle: "Shoulders", description: "Joint prep.", image: placeholderImg("Arm Circles") },
      { id: "w6-3", name: "Band pressdowns", type: "warmup", reps_or_time: "15 reps", target_muscle: "Triceps", description: "Pump blood to triceps.", image: placeholderImg("Band Pressdowns") },
      { id: "w6-4", name: "Light overhead triceps extension", type: "warmup", reps_or_time: "12 reps", target_muscle: "Triceps", description: "Stretch and activate long head.", image: placeholderImg("Overhead Extension") },
      { id: "w6-5", name: "Elbow flexion and extension", type: "warmup", reps_or_time: "15 reps", target_muscle: "Elbows", description: "Joint lubrication.", image: placeholderImg("Elbow Flexion") },
      { id: "w6-6", name: "Scapular push-ups", type: "warmup", reps_or_time: "10 reps", target_muscle: "Shoulders", description: "Shoulder stability.", image: placeholderImg("Scap Pushups") },
      { id: "w6-7", name: "Light pushdown warmup sets", type: "warmup", reps_or_time: "1-2 sets", target_muscle: "Triceps", description: "Movement prep.", image: placeholderImg("Pushdown Warmup") }
    ],
    stretches: [
      { id: "s6-1", name: "Overhead triceps stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Triceps", description: "Pull elbow behind head.", image: placeholderImg("Overhead Tricep Stretch") },
      { id: "s6-2", name: "Doorway chest stretch", type: "stretch", reps_or_time: "30 sec", target_muscle: "Chest", description: "Open up the front body.", image: placeholderImg("Chest Stretch") },
      { id: "s6-3", name: "Lat stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Lats", description: "Decompress sides.", image: placeholderImg("Lat Stretch") },
      { id: "s6-4", name: "Wrist stretch", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Wrists", description: "Relieve grip tension.", image: placeholderImg("Wrist Stretch") },
      { id: "s6-5", name: "Shoulder stretch across chest", type: "stretch", reps_or_time: "30 sec each side", target_muscle: "Shoulders", description: "Basic shoulder release.", image: placeholderImg("Shoulder Stretch") }
    ]
  },
  {
    dayNumber: 7,
    title: "Rest & Recovery",
    muscleGroup: "Full Body",
    estimatedTime: "20 mins",
    difficulty: "Beginner",
    warmups: [
      { id: "w7-1", name: "15-20 min walk", type: "recovery", reps_or_time: "20 min", target_muscle: "Full Body", description: "Active recovery.", image: placeholderImg("Walking") },
      { id: "w7-2", name: "Foam rolling", type: "recovery", reps_or_time: "5-10 min", target_muscle: "Sore Muscles", description: "Self-myofascial release.", image: placeholderImg("Foam Rolling") }
    ],
    stretches: [
      { id: "s7-1", name: "Hamstring stretch", type: "stretch", reps_or_time: "30 sec", target_muscle: "Hamstrings", description: "Gentle stretch.", image: placeholderImg("Hamstring Stretch") },
      { id: "s7-2", name: "Quad stretch", type: "stretch", reps_or_time: "30 sec", target_muscle: "Quads", description: "Gentle stretch.", image: placeholderImg("Quad Stretch") },
      { id: "s7-3", name: "Chest stretch", type: "stretch", reps_or_time: "30 sec", target_muscle: "Chest", description: "Gentle stretch.", image: placeholderImg("Chest Stretch") },
      { id: "s7-4", name: "Child’s pose", type: "stretch", reps_or_time: "60 sec", target_muscle: "Full Body", description: "Relaxation.", image: placeholderImg("Childs Pose") },
      { id: "s7-5", name: "Hip flexor stretch", type: "stretch", reps_or_time: "30 sec", target_muscle: "Hips", description: "Gentle stretch.", image: placeholderImg("Hip Flexor Stretch") }
    ]
  }
];