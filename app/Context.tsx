import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface Exercise {
  id: number;
  image: ImageSourcePropType;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  category: string;
  logged?: string;
  isLogged?: boolean;
}

interface ExerciseDetail {
  instruction: string[];
  target: {
    primary: string[];
    secondary: string[];
  };
  equipment: string[];
}

// Dictionary mapping exercise names to [muscle_group, list_image_path, how_to_image_path]
export const EXERCISE_DATA: { [key: string]: [string, ImageSourcePropType, ImageSourcePropType] } = {
  // Back Exercises
  "Barbell Rows": ["Back", require("@/assets/images/List-Images/Back_Barbell_Rows.png"), require("@/assets/images/How-To-Images/Back_HT_Barbell_Rows.png")],
  "Deadlift": ["Back", require("@/assets/images/List-Images/Back_Deadlift.png"), require("@/assets/images/How-To-Images/Back_HT_Deadlift.png")],
  "Dumbbell Row": ["Back", require("@/assets/images/List-Images/Back_Dumbell_Row.png"), require("@/assets/images/How-To-Images/Back_HT_Dumbell_Row.png")],
  "Lat Pulldown": ["Back", require("@/assets/images/List-Images/Back_Lat_PD.png"), require("@/assets/images/How-To-Images/Back_HT_Lat_PD.png")],
  "Pull Ups": ["Back", require("@/assets/images/List-Images/Back_Pull_Ups.png"), require("@/assets/images/How-To-Images/Back_HT_Pull_Ups.png")],

  // Bicep Exercises
  "Bicep Curl": ["Biceps", require("@/assets/images/List-Images/Bicep_Curl.png"), require("@/assets/images/How-To-Images/Bicep_HT_Curl.png")],
  "Concentration Curl": ["Biceps", require("@/assets/images/List-Images/Bicep_Concentration_Curl.png"), require("@/assets/images/How-To-Images/Bicep_HT_Concentration_Curl.png")],
  "Bicep Dumbbell Curl": ["Biceps", require("@/assets/images/List-Images/Bicep_Dumbell_Curl.png"), require("@/assets/images/How-To-Images/Bicep_HT_Dumbell_Curl.png")],
  "Hammer Curl": ["Biceps", require("@/assets/images/List-Images/Bicep_Hammer_Curl.png"), require("@/assets/images/How-To-Images/Bicep_HT_Hammer_Curl.png")],
  "Preacher Curl": ["Biceps", require("@/assets/images/List-Images/Bicep_Preacher_Curl.png"), require("@/assets/images/How-To-Images/Bicep_HT_Preacher_Curl.png")],

  // Calf Exercises
  "Donkey Raise": ["Calves", require("@/assets/images/List-Images/Calf_Donkey_Raise.png"), require("@/assets/images/How-To-Images/Calf_HT_Donkey_Raise.png")],
  "Jump Rope": ["Calves", require("@/assets/images/List-Images/Calf_Jump_Rope.png"), require("@/assets/images/How-To-Images/Calf_HT_Jump_Rope.png")],
  "Calf Raise": ["Calves", require("@/assets/images/List-Images/Calf_Raise.png"), require("@/assets/images/How-To-Images/Calf_HT_Raise.png")],
  "Seated Calf Raise": ["Calves", require("@/assets/images/List-Images/Calf_Seated_Raise.png"), require("@/assets/images/How-To-Images/Calf_HT_Seated_Raise.png")],
  "Smith Calf Raise": ["Calves", require("@/assets/images/List-Images/Calf_Smith_Raise.png"), require("@/assets/images/How-To-Images/Calf_HT_Smith_Raise.png")],

  // Chest Exercises
  "Bench Press": ["Chest", require("@/assets/images/List-Images/Chest_Bench_Press.png"), require("@/assets/images/How-To-Images/Chest_HT_Bench_Press.png")],
  "Dumbbell Chest Press": ["Chest", require("@/assets/images/List-Images/Chest_Dumbell_Press.png"), require("@/assets/images/How-To-Images/Chest_HT_Dumbell_Press.png")],
  "Chest Fly": ["Chest", require("@/assets/images/List-Images/Chest_Fly.png"), require("@/assets/images/How-To-Images/Chest_HT_Fly.png")],
  "Incline Dumbbell Press": ["Chest", require("@/assets/images/List-Images/Chest_Incline_Dumbell_Press.png"), require("@/assets/images/How-To-Images/Chest_HT_Incline_Dumbell_Press.png")],
  "Push Ups": ["Chest", require("@/assets/images/List-Images/Chest_Push_Ups.png"), require("@/assets/images/How-To-Images/Chest_HT_Push_Ups.png")],

  // Core Exercises
  "Bicycle Crunch": ["Core", require("@/assets/images/List-Images/Core_Bicycle_Crunch.png"), require("@/assets/images/How-To-Images/Core_HT_Bicycle_Crunch.png")],
  "Leg Raise": ["Core", require("@/assets/images/List-Images/Core_Leg_Raise.png"), require("@/assets/images/How-To-Images/Core_HT_Leg_Raise.png")],
  "Mountain Climbers": ["Core", require("@/assets/images/List-Images/Core_Mtn_Climbers.png"), require("@/assets/images/How-To-Images/Core_HT_Mtn_Climbers.png")],
  "Plank": ["Core", require("@/assets/images/List-Images/Core_Plank.png"), require("@/assets/images/How-To-Images/Core_HT_Plank.png")],
  "Russian Twist": ["Core", require("@/assets/images/List-Images/Core_Rus_Twist.png"), require("@/assets/images/How-To-Images/Core_HT_Rus_Twist.png")],

  // Glute Exercises
  "Glute Bridge": ["Glutes", require("@/assets/images/List-Images/Glute_Bridge.png"), require("@/assets/images/How-To-Images/Glute_HT_Bridge.png")],
  "Hip Thrust": ["Glutes", require("@/assets/images/List-Images/Glute_Hip_Thrust.png"), require("@/assets/images/How-To-Images/Glute_HT_Hip_Thrust.png")],
  "Kettlebell Row": ["Glutes", require("@/assets/images/List-Images/Glute_Kettlebell_Row.png"), require("@/assets/images/How-To-Images/Glute_HT_Kettlebell_Row.png")],
  "Split Squat": ["Glutes", require("@/assets/images/List-Images/Glute_Split_Squat.png"), require("@/assets/images/How-To-Images/Glute_HT_Split_Squat.png")],
  "Step Up": ["Glutes", require("@/assets/images/List-Images/Glute_Step_Up.png"), require("@/assets/images/How-To-Images/Glute_HT_Step_Up.png")],

  // Hamstring Exercises
  "Good Morning": ["Hamstrings", require("@/assets/images/List-Images/Hamstring_Good_Morning.png"), require("@/assets/images/How-To-Images/Hamstring_HT_Good_Morning.png")],
  "Machine Curl": ["Hamstrings", require("@/assets/images/List-Images/Hamstring_Machine_Curl.png"), require("@/assets/images/How-To-Images/Hamstring_HT_Machine_Curl.png")],
  "Romanian Deadlift": ["Hamstrings", require("@/assets/images/List-Images/Hamstring_Romanian_Deadlift.png"), require("@/assets/images/How-To-Images/Hamstring_HT_Romanian_Deadlift.png")],
  "Stiff Leg Deadlift": ["Hamstrings", require("@/assets/images/List-Images/Hamstring_Stiff_Deadlift.png"), require("@/assets/images/How-To-Images/Hamsting_HT_Stiff_Deadlift.png")],
  "Walking Lunge": ["Hamstrings", require("@/assets/images/List-Images/Hamstring_Walk_Lunge.png"), require("@/assets/images/How-To-Images/Hamstring_HT_Walk_Lunge.png")],

  // Leg Exercises
  "Barbell Squats": ["Legs", require("@/assets/images/List-Images/Leg_Barbell_Squats.png"), require("@/assets/images/How-To-Images/Leg_HT_Barbell_Squats.png")],
  "Lunges": ["Legs", require("@/assets/images/List-Images/Leg_Lunges.png"), require("@/assets/images/How-To-Images/Leg_HT_Lunges.png")],
  "Machine Extension": ["Legs", require("@/assets/images/List-Images/Leg_Machine_Extension.png"), require("@/assets/images/How-To-Images/Leg_HT_Machine_Extension.png")],
  "Leg Press": ["Legs", require("@/assets/images/List-Images/Leg_Press.png"), require("@/assets/images/How-To-Images/Leg_HT_Press.png")],
  "Leg Split Squat": ["Legs", require("@/assets/images/List-Images/Leg_Split_Squat.png"), require("@/assets/images/How-To-Images/Leg_HT_Split_Squat.png")],

  // Shoulder Exercises
  "Shoulder Dumbbell Press": ["Shoulders", require("@/assets/images/List-Images/Shoulder_Dumbell_Press.png"), require("@/assets/images/How-To-Images/Shoulder_HT_Dumbell_Press.png")],
  "Face Pulls": ["Shoulders", require("@/assets/images/List-Images/Shoulder_Face_Pulls.png"), require("@/assets/images/How-To-Images/Shoulder_HT_Face_Pulls.png")],
  "Front Raise": ["Shoulders", require("@/assets/images/List-Images/Shoulder_Front_Raise.png"), require("@/assets/images/How-To-Images/Shoulder_HT_Front_Raise.png")],
  "Lateral Raise": ["Shoulders", require("@/assets/images/List-Images/Shoulder_Lateral_Raise.png"), require("@/assets/images/How-To-Images/Shoulder_HT_Lateral_Raise.png")],
  "Reverse Fly": ["Shoulders", require("@/assets/images/List-Images/Shoulder_Reverse_Fly.png"), require("@/assets/images/How-To-Images/Shoulder_HT_Reverse_Fly.png")],

  // Tricep Exercises
  "Close Grip Bench": ["Triceps", require("@/assets/images/List-Images/Tricep_Close_Grip_Bench.png"), require("@/assets/images/How-To-Images/Tricep_HT_Close_Grip_Bench.png")],
  "Tricep Dips": ["Triceps", require("@/assets/images/List-Images/Tricep_Dips.png"), require("@/assets/images/How-To-Images/Tricep_HT_Dips.png")],
  "Tricep Kickbacks": ["Triceps", require("@/assets/images/List-Images/Tricep_Kickbacks.png"), require("@/assets/images/How-To-Images/Tricep_HT_Kickbacks.png")],
  "Tricep Overhead Extension": ["Triceps", require("@/assets/images/List-Images/Tricep_Overhead_Extension.png"), require("@/assets/images/How-To-Images/Tricep_HT_Overhead_Extension.png")],
  "Skullcrushers": ["Triceps", require("@/assets/images/List-Images/Tricep_Skullcrushers.png"), require("@/assets/images/How-To-Images/Tricep_HT_Skullcrushers.png")]
};
export const EXERCISE_DETAILS: { [key: string]: ExerciseDetail } = {
  "Barbell Rows": {
    "instruction": [
      "Step 1 for Barbell Rows",
      "Step 2 for Barbell Rows",
      "Step 3 for Barbell Rows",
      "Step 4 for Barbell Rows"
    ],
    "target": {
      "primary": [
        "Primary muscle for Barbell Rows"
      ],
      "secondary": [
        "Secondary muscle for Barbell Rows"
      ]
    },
    "equipment": [
      "Equipment for Barbell Rows"
    ]
  },
  "Deadlift": {
    "instruction": [
      "Stand with feet hip-width apart, barbell over mid-foot.",
      "Bend at the hips and knees to grip the barbell.",
      "Lift the bar by straightening hips and knees simultaneously.",
      "Lower the bar under control to the ground."
    ],
    "target": {
      "primary": [
        "Hamstrings",
        "Glutes",
        "Lower Back"
      ],
      "secondary": [
        "Traps",
        "Forearms"
      ]
    },
    "equipment": [
      "Barbell",
      "Weight Plates"
    ]
  },
  "Dumbbell Row": {
    "instruction": [
      "Step 1 for Dumbbell Row",
      "Step 2 for Dumbbell Row",
      "Step 3 for Dumbbell Row",
      "Step 4 for Dumbbell Row"
    ],
    "target": {
      "primary": [
        "Primary muscle for Dumbbell Row"
      ],
      "secondary": [
        "Secondary muscle for Dumbbell Row"
      ]
    },
    "equipment": [
      "Equipment for Dumbbell Row"
    ]
  },
  "Lat Pulldown": {
    "instruction": [
      "Grip the bar slightly wider than shoulder-width.",
      "Pull your chest toward the bar or bring the bar to your chest.",
      "Squeeze your shoulder blades together.",
      "Lower yourself or the bar under control."
    ],
    "target": {
      "primary": [
        "Latissimus Dorsi"
      ],
      "secondary": [
        "Biceps",
        "Rhomboids",
        "Traps"
      ]
    },
    "equipment": [
      "Lat Pulldown Machine"
    ]
  },
  "Pull Ups": {
    "instruction": [
      "Grip the bar slightly wider than shoulder-width.",
      "Pull your chest toward the bar or bring the bar to your chest.",
      "Squeeze your shoulder blades together.",
      "Lower yourself or the bar under control."
    ],
    "target": {
      "primary": [
        "Latissimus Dorsi"
      ],
      "secondary": [
        "Biceps",
        "Rhomboids",
        "Traps"
      ]
    },
    "equipment": [
      "Pull-Up Bar"
    ]
  },
  "Bicep Curl": {
    "instruction": [
      "Stand with feet shoulder-width apart holding the weights.",
      "Keep elbows close to torso and curl the weights while contracting the biceps.",
      "Pause at the top and squeeze the biceps.",
      "Lower the weights back to the starting position."
    ],
    "target": {
      "primary": [
        "Biceps"
      ],
      "secondary": [
        "Forearms"
      ]
    },
    "equipment": [
      "Barbell"
    ]
  },
  "Concentration Curl": {
    "instruction": [
      "Stand with feet shoulder-width apart holding the weights.",
      "Keep elbows close to torso and curl the weights while contracting the biceps.",
      "Pause at the top and squeeze the biceps.",
      "Lower the weights back to the starting position."
    ],
    "target": {
      "primary": [
        "Biceps"
      ],
      "secondary": [
        "Forearms"
      ]
    },
    "equipment": [
      "Barbell"
    ]
  },
  "Bicep Dumbbell Curl": {
    "instruction": [
      "Stand with feet shoulder-width apart holding the weights.",
      "Keep elbows close to torso and curl the weights while contracting the biceps.",
      "Pause at the top and squeeze the biceps.",
      "Lower the weights back to the starting position."
    ],
    "target": {
      "primary": [
        "Biceps"
      ],
      "secondary": [
        "Forearms"
      ]
    },
    "equipment": [
      "Dumbbells"
    ]
  },
  "Hammer Curl": {
    "instruction": [
      "Stand with feet shoulder-width apart holding the weights.",
      "Keep elbows close to torso and curl the weights while contracting the biceps.",
      "Pause at the top and squeeze the biceps.",
      "Lower the weights back to the starting position."
    ],
    "target": {
      "primary": [
        "Biceps"
      ],
      "secondary": [
        "Forearms"
      ]
    },
    "equipment": [
      "Barbell"
    ]
  },
  "Preacher Curl": {
    "instruction": [
      "Stand with feet shoulder-width apart holding the weights.",
      "Keep elbows close to torso and curl the weights while contracting the biceps.",
      "Pause at the top and squeeze the biceps.",
      "Lower the weights back to the starting position."
    ],
    "target": {
      "primary": [
        "Biceps"
      ],
      "secondary": [
        "Forearms"
      ]
    },
    "equipment": [
      "Barbell"
    ]
  },
  "Donkey Raise": {
    "instruction": [
      "Step 1 for Donkey Raise",
      "Step 2 for Donkey Raise",
      "Step 3 for Donkey Raise",
      "Step 4 for Donkey Raise"
    ],
    "target": {
      "primary": [
        "Primary muscle for Donkey Raise"
      ],
      "secondary": [
        "Secondary muscle for Donkey Raise"
      ]
    },
    "equipment": [
      "Equipment for Donkey Raise"
    ]
  },
  "Jump Rope": {
    "instruction": [
      "Step 1 for Jump Rope",
      "Step 2 for Jump Rope",
      "Step 3 for Jump Rope",
      "Step 4 for Jump Rope"
    ],
    "target": {
      "primary": [
        "Primary muscle for Jump Rope"
      ],
      "secondary": [
        "Secondary muscle for Jump Rope"
      ]
    },
    "equipment": [
      "Equipment for Jump Rope"
    ]
  },
  "Calf Raise": {
    "instruction": [
      "Step 1 for Calf Raise",
      "Step 2 for Calf Raise",
      "Step 3 for Calf Raise",
      "Step 4 for Calf Raise"
    ],
    "target": {
      "primary": [
        "Primary muscle for Calf Raise"
      ],
      "secondary": [
        "Secondary muscle for Calf Raise"
      ]
    },
    "equipment": [
      "Equipment for Calf Raise"
    ]
  },
  "Seated Calf Raise": {
    "instruction": [
      "Step 1 for Seated Calf Raise",
      "Step 2 for Seated Calf Raise",
      "Step 3 for Seated Calf Raise",
      "Step 4 for Seated Calf Raise"
    ],
    "target": {
      "primary": [
        "Primary muscle for Seated Calf Raise"
      ],
      "secondary": [
        "Secondary muscle for Seated Calf Raise"
      ]
    },
    "equipment": [
      "Equipment for Seated Calf Raise"
    ]
  },
  "Smith Calf Raise": {
    "instruction": [
      "Step 1 for Smith Calf Raise",
      "Step 2 for Smith Calf Raise",
      "Step 3 for Smith Calf Raise",
      "Step 4 for Smith Calf Raise"
    ],
    "target": {
      "primary": [
        "Primary muscle for Smith Calf Raise"
      ],
      "secondary": [
        "Secondary muscle for Smith Calf Raise"
      ]
    },
    "equipment": [
      "Equipment for Smith Calf Raise"
    ]
  },
  "Bench Press": {
    "instruction": [
      "Lie on a bench and grip the bar slightly wider than shoulder-width.",
      "Lower the bar to your chest under control.",
      "Push the bar back up until arms are extended.",
      "Repeat for desired repetitions."
    ],
    "target": {
      "primary": [
        "Chest"
      ],
      "secondary": [
        "Triceps",
        "Shoulders"
      ]
    },
    "equipment": [
      "Barbell",
      "Bench"
    ]
  },
  "Dumbbell Chest Press": {
    "instruction": [
      "Lie on a bench and grip the bar slightly wider than shoulder-width.",
      "Lower the bar to your chest under control.",
      "Push the bar back up until arms are extended.",
      "Repeat for desired repetitions."
    ],
    "target": {
      "primary": [
        "Chest"
      ],
      "secondary": [
        "Triceps",
        "Shoulders"
      ]
    },
    "equipment": [
      "Barbell",
      "Bench"
    ]
  },
  "Chest Fly": {
    "instruction": [
      "Step 1 for Chest Fly",
      "Step 2 for Chest Fly",
      "Step 3 for Chest Fly",
      "Step 4 for Chest Fly"
    ],
    "target": {
      "primary": [
        "Primary muscle for Chest Fly"
      ],
      "secondary": [
        "Secondary muscle for Chest Fly"
      ]
    },
    "equipment": [
      "Equipment for Chest Fly"
    ]
  },
  "Incline Dumbbell Press": {
    "instruction": [
      "Lie on a bench and grip the bar slightly wider than shoulder-width.",
      "Lower the bar to your chest under control.",
      "Push the bar back up until arms are extended.",
      "Repeat for desired repetitions."
    ],
    "target": {
      "primary": [
        "Chest"
      ],
      "secondary": [
        "Triceps",
        "Shoulders"
      ]
    },
    "equipment": [
      "Barbell",
      "Bench"
    ]
  },
  "Push Ups": {
    "instruction": [
      "Step 1 for Push Ups",
      "Step 2 for Push Ups",
      "Step 3 for Push Ups",
      "Step 4 for Push Ups"
    ],
    "target": {
      "primary": [
        "Primary muscle for Push Ups"
      ],
      "secondary": [
        "Secondary muscle for Push Ups"
      ]
    },
    "equipment": [
      "Equipment for Push Ups"
    ]
  },
  "Bicycle Crunch": {
    "instruction": [
      "Step 1 for Bicycle Crunch",
      "Step 2 for Bicycle Crunch",
      "Step 3 for Bicycle Crunch",
      "Step 4 for Bicycle Crunch"
    ],
    "target": {
      "primary": [
        "Primary muscle for Bicycle Crunch"
      ],
      "secondary": [
        "Secondary muscle for Bicycle Crunch"
      ]
    },
    "equipment": [
      "Equipment for Bicycle Crunch"
    ]
  },
  "Leg Raise": {
    "instruction": [
      "Step 1 for Leg Raise",
      "Step 2 for Leg Raise",
      "Step 3 for Leg Raise",
      "Step 4 for Leg Raise"
    ],
    "target": {
      "primary": [
        "Primary muscle for Leg Raise"
      ],
      "secondary": [
        "Secondary muscle for Leg Raise"
      ]
    },
    "equipment": [
      "Equipment for Leg Raise"
    ]
  },
  "Mountain Climbers": {
    "instruction": [
      "Step 1 for Mountain Climbers",
      "Step 2 for Mountain Climbers",
      "Step 3 for Mountain Climbers",
      "Step 4 for Mountain Climbers"
    ],
    "target": {
      "primary": [
        "Primary muscle for Mountain Climbers"
      ],
      "secondary": [
        "Secondary muscle for Mountain Climbers"
      ]
    },
    "equipment": [
      "Equipment for Mountain Climbers"
    ]
  },
  "Plank": {
    "instruction": [
      "Place forearms on the ground with elbows aligned below shoulders.",
      "Lift body keeping it in a straight line from head to heels.",
      "Engage core and glutes.",
      "Hold position as long as possible."
    ],
    "target": {
      "primary": [
        "Abdominals"
      ],
      "secondary": [
        "Lower Back",
        "Shoulders"
      ]
    },
    "equipment": [
      "Bodyweight"
    ]
  },
  "Russian Twist": {
    "instruction": [
      "Step 1 for Russian Twist",
      "Step 2 for Russian Twist",
      "Step 3 for Russian Twist",
      "Step 4 for Russian Twist"
    ],
    "target": {
      "primary": [
        "Primary muscle for Russian Twist"
      ],
      "secondary": [
        "Secondary muscle for Russian Twist"
      ]
    },
    "equipment": [
      "Equipment for Russian Twist"
    ]
  },
  "Glute Bridge": {
    "instruction": [
      "Step 1 for Glute Bridge",
      "Step 2 for Glute Bridge",
      "Step 3 for Glute Bridge",
      "Step 4 for Glute Bridge"
    ],
    "target": {
      "primary": [
        "Primary muscle for Glute Bridge"
      ],
      "secondary": [
        "Secondary muscle for Glute Bridge"
      ]
    },
    "equipment": [
      "Equipment for Glute Bridge"
    ]
  },
  "Hip Thrust": {
    "instruction": [
      "Step 1 for Hip Thrust",
      "Step 2 for Hip Thrust",
      "Step 3 for Hip Thrust",
      "Step 4 for Hip Thrust"
    ],
    "target": {
      "primary": [
        "Primary muscle for Hip Thrust"
      ],
      "secondary": [
        "Secondary muscle for Hip Thrust"
      ]
    },
    "equipment": [
      "Equipment for Hip Thrust"
    ]
  },
  "Kettlebell Row": {
    "instruction": [
      "Step 1 for Kettlebell Row",
      "Step 2 for Kettlebell Row",
      "Step 3 for Kettlebell Row",
      "Step 4 for Kettlebell Row"
    ],
    "target": {
      "primary": [
        "Primary muscle for Kettlebell Row"
      ],
      "secondary": [
        "Secondary muscle for Kettlebell Row"
      ]
    },
    "equipment": [
      "Equipment for Kettlebell Row"
    ]
  },
  "Split Squat": {
    "instruction": [
      "Stand with feet shoulder-width apart with the barbell on your upper back.",
      "Bend knees and hips to lower your body.",
      "Go down until thighs are parallel to the ground.",
      "Push back up through heels to starting position."
    ],
    "target": {
      "primary": [
        "Quadriceps",
        "Glutes"
      ],
      "secondary": [
        "Hamstrings",
        "Lower Back"
      ]
    },
    "equipment": [
      "Barbell",
      "Squat Rack"
    ]
  },
  "Step Up": {
    "instruction": [
      "Step 1 for Step Up",
      "Step 2 for Step Up",
      "Step 3 for Step Up",
      "Step 4 for Step Up"
    ],
    "target": {
      "primary": [
        "Primary muscle for Step Up"
      ],
      "secondary": [
        "Secondary muscle for Step Up"
      ]
    },
    "equipment": [
      "Equipment for Step Up"
    ]
  },
  "Good Morning": {
    "instruction": [
      "Step 1 for Good Morning",
      "Step 2 for Good Morning",
      "Step 3 for Good Morning",
      "Step 4 for Good Morning"
    ],
    "target": {
      "primary": [
        "Primary muscle for Good Morning"
      ],
      "secondary": [
        "Secondary muscle for Good Morning"
      ]
    },
    "equipment": [
      "Equipment for Good Morning"
    ]
  },
  "Machine Curl": {
    "instruction": [
      "Stand with feet shoulder-width apart holding the weights.",
      "Keep elbows close to torso and curl the weights while contracting the biceps.",
      "Pause at the top and squeeze the biceps.",
      "Lower the weights back to the starting position."
    ],
    "target": {
      "primary": [
        "Biceps"
      ],
      "secondary": [
        "Forearms"
      ]
    },
    "equipment": [
      "Barbell"
    ]
  },
  "Romanian Deadlift": {
    "instruction": [
      "Stand with feet hip-width apart, barbell over mid-foot.",
      "Bend at the hips and knees to grip the barbell.",
      "Lift the bar by straightening hips and knees simultaneously.",
      "Lower the bar under control to the ground."
    ],
    "target": {
      "primary": [
        "Hamstrings",
        "Glutes",
        "Lower Back"
      ],
      "secondary": [
        "Traps",
        "Forearms"
      ]
    },
    "equipment": [
      "Barbell",
      "Weight Plates"
    ]
  },
  "Stiff Leg Deadlift": {
    "instruction": [
      "Stand with feet hip-width apart, barbell over mid-foot.",
      "Bend at the hips and knees to grip the barbell.",
      "Lift the bar by straightening hips and knees simultaneously.",
      "Lower the bar under control to the ground."
    ],
    "target": {
      "primary": [
        "Hamstrings",
        "Glutes",
        "Lower Back"
      ],
      "secondary": [
        "Traps",
        "Forearms"
      ]
    },
    "equipment": [
      "Barbell",
      "Weight Plates"
    ]
  },
  "Walking Lunge": {
    "instruction": [
      "Step 1 for Walking Lunge",
      "Step 2 for Walking Lunge",
      "Step 3 for Walking Lunge",
      "Step 4 for Walking Lunge"
    ],
    "target": {
      "primary": [
        "Primary muscle for Walking Lunge"
      ],
      "secondary": [
        "Secondary muscle for Walking Lunge"
      ]
    },
    "equipment": [
      "Equipment for Walking Lunge"
    ]
  },
  "Barbell Squats": {
    "instruction": [
      "Stand with feet shoulder-width apart with the barbell on your upper back.",
      "Bend knees and hips to lower your body.",
      "Go down until thighs are parallel to the ground.",
      "Push back up through heels to starting position."
    ],
    "target": {
      "primary": [
        "Quadriceps",
        "Glutes"
      ],
      "secondary": [
        "Hamstrings",
        "Lower Back"
      ]
    },
    "equipment": [
      "Barbell",
      "Squat Rack"
    ]
  },
  "Lunges": {
    "instruction": [
      "Step 1 for Lunges",
      "Step 2 for Lunges",
      "Step 3 for Lunges",
      "Step 4 for Lunges"
    ],
    "target": {
      "primary": [
        "Primary muscle for Lunges"
      ],
      "secondary": [
        "Secondary muscle for Lunges"
      ]
    },
    "equipment": [
      "Equipment for Lunges"
    ]
  },
  "Machine Extension": {
    "instruction": [
      "Step 1 for Machine Extension",
      "Step 2 for Machine Extension",
      "Step 3 for Machine Extension",
      "Step 4 for Machine Extension"
    ],
    "target": {
      "primary": [
        "Primary muscle for Machine Extension"
      ],
      "secondary": [
        "Secondary muscle for Machine Extension"
      ]
    },
    "equipment": [
      "Equipment for Machine Extension"
    ]
  },
  "Leg Press": {
    "instruction": [
      "Lie on a bench and grip the bar slightly wider than shoulder-width.",
      "Lower the bar to your chest under control.",
      "Push the bar back up until arms are extended.",
      "Repeat for desired repetitions."
    ],
    "target": {
      "primary": [
        "Chest"
      ],
      "secondary": [
        "Triceps",
        "Shoulders"
      ]
    },
    "equipment": [
      "Barbell",
      "Bench"
    ]
  },
  "Leg Split Squat": {
    "instruction": [
      "Stand with feet shoulder-width apart with the barbell on your upper back.",
      "Bend knees and hips to lower your body.",
      "Go down until thighs are parallel to the ground.",
      "Push back up through heels to starting position."
    ],
    "target": {
      "primary": [
        "Quadriceps",
        "Glutes"
      ],
      "secondary": [
        "Hamstrings",
        "Lower Back"
      ]
    },
    "equipment": [
      "Barbell",
      "Squat Rack"
    ]
  },
  "Shoulder Dumbbell Press": {
    "instruction": [
      "Lie on a bench and grip the bar slightly wider than shoulder-width.",
      "Lower the bar to your chest under control.",
      "Push the bar back up until arms are extended.",
      "Repeat for desired repetitions."
    ],
    "target": {
      "primary": [
        "Chest"
      ],
      "secondary": [
        "Triceps",
        "Shoulders"
      ]
    },
    "equipment": [
      "Barbell",
      "Bench"
    ]
  },
  "Face Pulls": {
    "instruction": [
      "Step 1 for Face Pulls",
      "Step 2 for Face Pulls",
      "Step 3 for Face Pulls",
      "Step 4 for Face Pulls"
    ],
    "target": {
      "primary": [
        "Primary muscle for Face Pulls"
      ],
      "secondary": [
        "Secondary muscle for Face Pulls"
      ]
    },
    "equipment": [
      "Equipment for Face Pulls"
    ]
  },
  "Front Raise": {
    "instruction": [
      "Step 1 for Front Raise",
      "Step 2 for Front Raise",
      "Step 3 for Front Raise",
      "Step 4 for Front Raise"
    ],
    "target": {
      "primary": [
        "Primary muscle for Front Raise"
      ],
      "secondary": [
        "Secondary muscle for Front Raise"
      ]
    },
    "equipment": [
      "Equipment for Front Raise"
    ]
  },
  "Lateral Raise": {
    "instruction": [
      "Step 1 for Lateral Raise",
      "Step 2 for Lateral Raise",
      "Step 3 for Lateral Raise",
      "Step 4 for Lateral Raise"
    ],
    "target": {
      "primary": [
        "Primary muscle for Lateral Raise"
      ],
      "secondary": [
        "Secondary muscle for Lateral Raise"
      ]
    },
    "equipment": [
      "Equipment for Lateral Raise"
    ]
  },
  "Reverse Fly": {
    "instruction": [
      "Step 1 for Reverse Fly",
      "Step 2 for Reverse Fly",
      "Step 3 for Reverse Fly",
      "Step 4 for Reverse Fly"
    ],
    "target": {
      "primary": [
        "Primary muscle for Reverse Fly"
      ],
      "secondary": [
        "Secondary muscle for Reverse Fly"
      ]
    },
    "equipment": [
      "Equipment for Reverse Fly"
    ]
  },
  "Close Grip Bench": {
    "instruction": [
      "Step 1 for Close Grip Bench",
      "Step 2 for Close Grip Bench",
      "Step 3 for Close Grip Bench",
      "Step 4 for Close Grip Bench"
    ],
    "target": {
      "primary": [
        "Primary muscle for Close Grip Bench"
      ],
      "secondary": [
        "Secondary muscle for Close Grip Bench"
      ]
    },
    "equipment": [
      "Equipment for Close Grip Bench"
    ]
  },
  "Tricep Dips": {
    "instruction": [
      "Step 1 for Tricep Dips",
      "Step 2 for Tricep Dips",
      "Step 3 for Tricep Dips",
      "Step 4 for Tricep Dips"
    ],
    "target": {
      "primary": [
        "Primary muscle for Tricep Dips"
      ],
      "secondary": [
        "Secondary muscle for Tricep Dips"
      ]
    },
    "equipment": [
      "Equipment for Tricep Dips"
    ]
  },
  "Tricep Kickbacks": {
    "instruction": [
      "Step 1 for Tricep Kickbacks",
      "Step 2 for Tricep Kickbacks",
      "Step 3 for Tricep Kickbacks",
      "Step 4 for Tricep Kickbacks"
    ],
    "target": {
      "primary": [
        "Primary muscle for Tricep Kickbacks"
      ],
      "secondary": [
        "Secondary muscle for Tricep Kickbacks"
      ]
    },
    "equipment": [
      "Equipment for Tricep Kickbacks"
    ]
  },
  "Tricep Overhead Extension": {
    "instruction": [
      "Step 1 for Tricep Overhead Extension",
      "Step 2 for Tricep Overhead Extension",
      "Step 3 for Tricep Overhead Extension",
      "Step 4 for Tricep Overhead Extension"
    ],
    "target": {
      "primary": [
        "Primary muscle for Tricep Overhead Extension"
      ],
      "secondary": [
        "Secondary muscle for Tricep Overhead Extension"
      ]
    },
    "equipment": [
      "Equipment for Tricep Overhead Extension"
    ]
  },
  "Skullcrushers": {
    "instruction": [
      "Step 1 for Skullcrushers",
      "Step 2 for Skullcrushers",
      "Step 3 for Skullcrushers",
      "Step 4 for Skullcrushers"
    ],
    "target": {
      "primary": [
        "Primary muscle for Skullcrushers"
      ],
      "secondary": [
        "Secondary muscle for Skullcrushers"
      ]
    },
    "equipment": [
      "Equipment for Skullcrushers"
    ]
  }
};

interface ExerciseContextType {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

// use API to fetch exercises
export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const initialExercises: Exercise[] = [
    {
      name: "Bench Press",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 1,
      image: EXERCISE_DATA["Bench Press"][1],
      category: EXERCISE_DATA["Bench Press"][0]
    },
    {
      name: "Deadlift",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 2,
      image: EXERCISE_DATA["Deadlift"][1],
      category: EXERCISE_DATA["Deadlift"][0]
    },
    {
      name: "Barbell Squats",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 3,
      image: EXERCISE_DATA["Barbell Squats"][1],
      category: EXERCISE_DATA["Barbell Squats"][0]
    },
    {
      name: "Pull Ups",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 4,
      image: EXERCISE_DATA["Pull Ups"][1],
      category: EXERCISE_DATA["Pull Ups"][0]
    },
    {
      name: "Push Ups",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 5,
      image: EXERCISE_DATA["Push Ups"][1],
      category: EXERCISE_DATA["Push Ups"][0]
    },
    {
      name: "Bicep Curl",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 6,
      image: EXERCISE_DATA["Bicep Curl"][1],
      category: EXERCISE_DATA["Bicep Curl"][0]
    },
    {
      name: "Tricep Dips",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 7,
      image: EXERCISE_DATA["Tricep Dips"][1],
      category: EXERCISE_DATA["Tricep Dips"][0]
    }
  ];

  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);

  return (
    <ExerciseContext.Provider value={{ exercises, setExercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercises must be used within an ExerciseProvider');
  }
  return context;
};


