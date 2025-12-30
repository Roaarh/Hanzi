import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 30,
    },
    reservation_date: {
      type: Date,
      required: true,
    },
    reservation_time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
