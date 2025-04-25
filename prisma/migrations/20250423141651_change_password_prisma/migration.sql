-- AlterTable
CREATE SEQUENCE referrals_ref_id_seq;
ALTER TABLE "referrals" ALTER COLUMN "ref_id" SET DEFAULT nextval('referrals_ref_id_seq'),
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE referrals_ref_id_seq OWNED BY "referrals"."ref_id";

-- AlterTable
CREATE SEQUENCE user_points_point_id_seq;
ALTER TABLE "user_points" ALTER COLUMN "point_id" SET DEFAULT nextval('user_points_point_id_seq'),
ALTER COLUMN "earned_date" DROP DEFAULT;
ALTER SEQUENCE user_points_point_id_seq OWNED BY "user_points"."point_id";
